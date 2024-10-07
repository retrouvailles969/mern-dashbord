import { useOne } from "@pankod/refine-core";
import { useParams } from '@pankod/refine-react-router-v6';

import { Profile } from 'components';

const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });

  console.log(data);

  // Gunakan objek kosong sebagai fallback, bukan array
  const myProfile = data?.data ?? {};

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  // Pastikan properti myProfile aman untuk diakses
  return (
    <Profile
      type="Agent"
      name={myProfile?.name || "Unknown"}  // Default value jika tidak ada name
      email={myProfile?.email || "No email"}
      avatar={myProfile?.avatar || "default-avatar-url"}  // Default avatar jika tidak ada
      stocks={myProfile?.allStocks || []}  // Default ke array kosong jika tidak ada
    />
  );
};

export default AgentProfile;
