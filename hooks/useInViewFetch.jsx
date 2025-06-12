import { useEffect, useRef, useState } from 'react';

const useInViewFetch = (callback, options = { threshold: 0.5 }) => {
  const targetRef = useRef(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFetched) {
          setHasFetched(true);
          callback();
        }
      },
      options
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, hasFetched, options]);

  return targetRef;
};

export default useInViewFetch;
