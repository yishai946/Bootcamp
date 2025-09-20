import useGetEstimatedDate from '@hooks/Exercises/useGetEstimatedDate';
import { useUser } from '@providers/UserProvider';
import EstimatedDate from '.';
import EstimatedDateSkeleton from '@skeletons/EstimatedDateSkeleton';
import ErrorAlert from '@components/ErrorAlert';
import { formatDate } from '@utils/helperFuncs';

const EstimatedDateDisplay = () => {
  const { user } = useUser();
  const { estimatedDateInfo, loading, error, retry } = useGetEstimatedDate(user?.id || '');

  return loading ? (
    <EstimatedDateSkeleton />
  ) : !estimatedDateInfo ? (
    <ErrorAlert error={error} retry={retry} />
  ) : (
    <EstimatedDate
      actualWorkDays={estimatedDateInfo.actualWorkDays}
      estimatedDate={formatDate(estimatedDateInfo.estimatedDate)}
    />
  );
};

export default EstimatedDateDisplay;
