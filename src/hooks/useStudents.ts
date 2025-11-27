import { useEffect, useState } from 'react';
import { getStudents } from '../services/studentService';

export function useStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    const data = await getStudents();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, reload: fetchStudents };
}
