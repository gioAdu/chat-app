import Layout from '@/components/Layout';
import withAuthProtection from '@/components/helpers/validators/authChecker';

const Home = () => {
  return <Layout />;
};

export default withAuthProtection(Home, true);
