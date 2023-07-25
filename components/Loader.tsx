import { MagnifyingGlass } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <MagnifyingGlass
        visible={true}
        height="120"
        width="120"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default Loader;
