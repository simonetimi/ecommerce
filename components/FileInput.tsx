import { useEffect, useRef, useState } from 'react';

export default function FileInput({
  name,
  description,
  buttonName,
  disabled,
  isInvalid,
  onChange,
  reset,
  onResetComplete,
}: {
  name: string;
  description: string;
  buttonName: string;
  required?: boolean;
  disabled?: boolean;
  isInvalid?: boolean;
  onChange: (file: File | undefined) => void;
  reset: boolean;
  onResetComplete: () => void;
}) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFileName(truncateFileName(selectedFile.name));
      onChange(selectedFile);
    } else {
      setFileName('');
      onChange(undefined);
    }
  };

  const truncateFileName = (name: string) => {
    if (name.length > 20) {
      return name.slice(0, 20) + '...';
    }
    return name;
  };

  // manually reset the form when upload is successful (controlled by the parent component)
  useEffect(() => {
    if (reset) {
      setFileName('');
      onResetComplete();
    }
  }, [reset, onChange, onResetComplete]);

  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1 dark:bg-zinc-800">
      <label
        htmlFor={name}
        className="m-1 inline-flex cursor-pointer items-center rounded-lg bg-primary-500 px-4 py-2 text-sm text-white hover:bg-primary-700 dark:bg-primary-400"
      >
        {buttonName}
      </label>
      <p className="text-sm text-neutral-500">
        {fileName !== '' ? (
          fileName
        ) : !isInvalid ? (
          description
        ) : (
          <span className="text-danger-500">File is required!</span>
        )}
      </p>
      <input
        id={name}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />
    </div>
  );
}
