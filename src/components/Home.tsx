import React, { useEffect, useState } from 'react';
import { BaseLink } from 'webnative/fs/types';
import { useAuth } from "../hooks";
import Sidebar from './Sidebar';

const Home = () => {
  const [notes, setNotes] = useState<BaseLink[]>([])
  const { fs } = useAuth();

  useEffect(() => {
    async function loadNotes() {
      if (!fs || !fs.appPath) return 

      const appPath = fs.appPath()
      if (await fs.exists(appPath)) {
        const linksObject = await fs.ls(appPath)
        const links = Object.entries(linksObject);
        setNotes(links.map(([_, link]) => {
          return link
        }));
      } else {
        await fs.mkdir(appPath)
        await fs.publish()
      }
    }

    loadNotes();
  }, [fs]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-600 break-all left-0 py-8 right-0 sticky">
        <h1>Notes</h1>
      </header>
      <aside>
        <Sidebar notes={notes} />
      </aside>
    </div>
  );
}

export default Home;
