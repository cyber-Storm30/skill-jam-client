import React, {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import Navigator from './navigation/stack';

const Main = () => {
  const user = useSelector(state => state.auth.user);

  const [inititalScreen, setInititalScreen] = useState(
    user?._id ? 'Home' : 'Launch',
  );

  return <Navigator inititalScreen={inititalScreen} />;
};

export default Main;
