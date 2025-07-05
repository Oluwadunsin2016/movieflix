import React from "react";
import SavedShows from "../components/SavedShows";
import WatchingShows from "../components/WatchingShows";
import LovedShows from "../components/LovedShows";
import ProfileSection from "../components/ProfileSection";

const Account = () => {
  return (
    <>
{/* Profile here */}
<ProfileSection/>
      <div className='mx-6 md:mx-12 lg:mx-16 xl:mx-20 2xl:mx-24 py-8'>
      <WatchingShows/>
      <LovedShows/>
      <SavedShows/>
</div>
    </>
  );
};

export default Account;
