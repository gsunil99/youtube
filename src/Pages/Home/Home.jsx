import { useState } from 'react';
import Feed from '../../Components/Feed/Feed';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Home.css';
import Searchfeed from '../../Components/Searchfeed/Searchfeed';

const Home = ({ sidebar, searchQuery }) => {
  const [category, setCategory] = useState(0);
  return (
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        {searchQuery ? (
          <Searchfeed searchText={searchQuery} />
        ) : (
          <Feed category={category} />
        )}
      </div>
    </>
  );
};
export default Home;
