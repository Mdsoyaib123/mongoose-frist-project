import { TErrorSources } from '../interface/error';

const handleDuplicateError = (err:any) => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extractedMsg = match && match[1];

  const errorSources: TErrorSources[] = [
    {
      path: ' ',
      message: extractedMsg,
    },
  ];

  return {
    statusCode,
    message: ' validation error',
    errorSources,
  };
};
export default handleDuplicateError;
