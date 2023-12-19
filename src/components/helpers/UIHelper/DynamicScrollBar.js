import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const DynamicScrollBar = ({ children }) => {
  return (
    <SimpleBar style={{ height: '100%' }}>
      {children}
    </SimpleBar>
  );
};

export default DynamicScrollBar;