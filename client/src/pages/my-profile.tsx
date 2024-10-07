import { useGetIdentity, useOne } from "@pankod/refine-core";
import { Profile } from 'components';

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userid,
  });

  // Gunakan objek kosong {} sebagai fallback, bukan array
  const myProfile = data?.data ?? {};

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      type="My"
      name={myProfile?.name || "Unknown"} // Default jika tidak ada name
      email={myProfile?.email || "No email"} // Default jika tidak ada email
      avatar={myProfile?.avatar || "default-avatar-url"} // Default jika tidak ada avatar
      stocks={myProfile?.allStocks || []} // Default ke array kosong jika tidak ada stocks
    />
  );
};

export default MyProfile;
