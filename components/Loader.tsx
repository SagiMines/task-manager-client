import { LoaderProps } from '@/types';
import { MagnifyingGlass, Oval } from 'react-loader-spinner';

const Loader = ({ taskAction, signAction, taskFormAction }: LoaderProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {!taskAction && !signAction && !taskFormAction && (
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
      )}

      {(taskAction || signAction || taskFormAction) && (
        <Oval
          height={25}
          width={25}
          color="rgb(29 78 216)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="rgb(150 205 245)"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
    </div>
  );
};

export default Loader;
