import React from 'react';
import { Title, ButtonOutlined, TopTitle, DateLang } from '@/shared/UI';
import { NodeJsIcon } from '@/shared/icons';
import './Main.scss';

export const Main: React.FC = () => {
  return (
    <main className="nodejs-main container">
      <div className="nodejs-main content column-2">
        <div className="icon">
          <NodeJsIcon width="200" height="192" />
        </div>
        <div className="info">
          <TopTitle text="Avialable" />
          <Title text="Node.js course" />
          <DateLang startDate="24 Jan, 2024" language="en" mode="online" />
          <ButtonOutlined label="Enroll" href="https://wearecommunity.io/events/nodejs-rs-2024q1" />
        </div>
      </div>
    </main>
  );
};
