import React from 'react';

import Text from '../Text/Text';

type Vacancy = {
  id: number;
  vacancy?: string;
  requirements?: string;
  docs?: string;
  salary?: string;
};

const VacanciesList: React.FC<{
  vacancies: Vacancy[];
}> = ({ vacancies }: { vacancies: Vacancy[] }) => {
  return (
    <table className={'table fs-4 m-0 text-primary border-primary'}>
      <thead>
        <tr>
          <th scope={'col'}>#</th>
          <th scope={'col'}>Вакансия</th>
          <th scope={'col'}>Требования к кандидату</th>
          <th scope={'col'}>Необходимые документы</th>
          <th scope={'col'}>Заработная плата</th>
        </tr>
      </thead>

      <tbody className={'overflow-auto'}>
        {vacancies.map(
          ({ id, vacancy, requirements, docs, salary }: Vacancy, index) => (
            <tr key={id}>
              <td scope={'row'}>{index + 1}</td>
              <td>{vacancy}</td>
              <td>
                <Text>{requirements || ''}</Text>
              </td>
              <td>
                <Text>{docs || ''}</Text>
              </td>
              <td>
                <Text>{salary || ''}</Text>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default VacanciesList;
