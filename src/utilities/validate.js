// export const validateForm = (chosenEnterprise, chosenFile) => {
//   const errors = [];
//   if (!chosenEnterprise) {
//     errors.push({ input: 'enterprise', message: 'Опция не выбрана!' });
//   }
//   if (!chosenFile) {
//     errors.push({ input: 'fileItem', message: 'Файл не выбран!' });
//   } else if (chosenFile.type !== 'text/csv') {
//     errors.push({
//       input: 'fileItem',
//       message: 'Поддерживаются только CSV файлы!',
//     });
//   }
//   return errors;
// };

export const validateVacancyFile = (file) => {
  if (!file) {
    return 'Файл не выбран!';
  } else if (file.type !== 'text/csv') {
    return 'Поддерживаются только CSV файлы!';
  }
  return null;
};
