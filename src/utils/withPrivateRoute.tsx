import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withPrivateRoute = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const isAuthenticated = // Your authentication check logic, e.g., check if the user is logged in

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return <p>Loading...</p>; // Or any loading state you want
    }

    return <Component {...props} />;
  };
};

export default withPrivateRoute;
