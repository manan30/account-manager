import React from 'react';
import Card from '../../../components/Card';
import Date from '../../../components/Date';
import Loader from '../../../components/Loader';
import { ICreditor } from '../../../models/Creditor';
import { CurrencyFormatter } from '../../../utils/Formatters';
import SettlementBadge from './SettlementBadge';

type CreditorDetailsCardProps = {
  creditorDataLoading?: boolean;
  creditor?: ICreditor;
};

const CreditorDetailsCard: React.FC<CreditorDetailsCardProps> = ({
  creditorDataLoading,
  creditor
}) => {
  return (
    <div className='mt-10 mb-8 md:mt-16'>
      <Card className='shadow-md md:w-3/5'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-lg font-bold text-indigo-600 md:text-2xl'>
            Creditor Details
          </h1>
          <span className='text-gray-700'>
            {creditorDataLoading ? (
              <div className='w-12 h-12 mt-4'>
                <Loader size={36} />
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-4 text-sm font-normal'>
                <div className='flex items-center space-x-1 text-xs sm:text-base'>
                  <span className='font-bold'>Name:</span>
                  <span>{creditor?.name}</span>
                </div>
                <div className='flex items-center space-x-2 text-xs sm:text-base'>
                  <span className='font-bold'>Account Settled:</span>
                  <span>
                    <SettlementBadge settled={creditor?.accountSettled} />
                  </span>
                </div>
                <div className='flex items-center space-x-2 text-xs sm:text-base'>
                  <span className='font-bold'>Account Settled On:</span>
                  <span>
                    <Date date={creditor?.accountSettledOn?.toDate()} />
                  </span>
                </div>
                <div className='flex items-center space-x-2 text-xs sm:text-base'>
                  <span className='font-bold'>Remaining Amount:</span>
                  <span>
                    {CurrencyFormatter.format(`${creditor?.remainingAmount}`)}{' '}
                    {creditor?.currency}
                  </span>
                </div>
                <div className='flex items-center space-x-2 text-xs sm:text-base'>
                  <span className='font-bold'>Credit Amount:</span>
                  <span>
                    {CurrencyFormatter.format(`${creditor?.amount}`)}{' '}
                    {creditor?.currency}
                  </span>
                </div>
              </div>
            )}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default CreditorDetailsCard;
