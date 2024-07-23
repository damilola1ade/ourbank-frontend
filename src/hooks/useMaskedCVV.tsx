import { useState, useEffect } from 'react';

export const useMaskedCVV = (cvv: string) => {
  const [maskedCvv, setMaskedCvv] = useState<string>('***');

  useEffect(() => {
    if (cvv.length === 3 && /^\d{3}$/.test(cvv)) {
      setMaskedCvv(cvv);
    } else {
      setMaskedCvv('***');
    }
  }, [cvv]);

  return maskedCvv;
};
