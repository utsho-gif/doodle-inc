/* eslint-disable @typescript-eslint/no-explicit-any */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

const ProgressBar: any = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  });

  return '';
};

export default ProgressBar;
