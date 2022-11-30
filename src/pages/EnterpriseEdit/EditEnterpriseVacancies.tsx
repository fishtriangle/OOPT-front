import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_ENTERPRISE } from '../../graphql/mutations/enterprise';
import { validateVacancyFile } from '../../utilities/validate';
import { Link, useParams } from 'react-router-dom';
import { readFile } from '../../utilities/filesInteractions';
import { parse } from '../../utilities/cssParseSync';
// import iconv from 'iconv-lite';

interface Vacancy {
  id?: number;
  vacancy?: string;
  requirements?: string;
  docs?: string;
  salary?: string;
  authorId?: number;
}

const EditEnterpriseVacancies: React.FC = () => {
  const id = Number(useParams().id);

  const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE);

  const [fileErrors, setFileErrors] = useState<string | null>(null);

  const fileVacancies = useRef<HTMLInputElement>(null);

  const handleFormSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    let vacanciesStr: string | ArrayBuffer | null = null;
    let vacancies: undefined | Vacancy[];
    event.preventDefault();
    const file = fileVacancies.current?.files?.[0];
    const error = validateVacancyFile(file);
    if (error) {
      setFileErrors(error);
    } else if (file) {
      setFileErrors(null);
      vacanciesStr = await readFile(file, 'string');
      if (typeof vacanciesStr === 'string') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        vacancies = parse(vacanciesStr, {
          columns: ['vacancy', 'requirements', 'docs', 'salary'],
          from_line: 2,
          delimiter: [';', ','],
        });
      }

      const input = {
        id,
        vacancies,
      };

      updateEnterprise({
        variables: { input },
      })
        .then(({ data }) => {
          alert(JSON.stringify(data.updateEnterprise.content));
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={'w-50 mx-auto mt-6'}>
      <fieldset className={'form-group'}>
        <legend className={'mb-4'}>Обновление списка вакансий</legend>
        <div className={'row mb-4'}>
          <label htmlFor='vacanciesFile' className='col-5 col-form-label'>
            Только CSV файлы:
          </label>
          <div className={'col-7'}>
            <input className='form-control' type='file' ref={fileVacancies} />
          </div>
          {fileErrors && (
            <div className={'col-2 small text-danger fw-bold pt-2'}>
              {fileErrors}
            </div>
          )}
        </div>
        <div className={'row '}>
          <div className={'col-4'}>
            <button
              type='submit'
              className='btn btn-warning px-5 text-black fw-bold me-3'
            >
              Отправить
            </button>
          </div>
          <div className={'col-4'}>
            <Link
              to={'/edit/enterprise'}
              className={'btn btn-outline-warning text-warning px-5'}
            >
              Отмена
            </Link>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default EditEnterpriseVacancies;
