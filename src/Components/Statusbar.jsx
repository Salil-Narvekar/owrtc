import React from 'react'

const Statusbar = ({ statusTitle, statusCount, statusIndex, statuslengthArr }) => {

  const statusBarDivisions = statusIndex.length;

  return (
    <div className='grid grid-flow-rows gap-1 justify-center font-semibold'>

      <span>{statusCount + " " + statusTitle}</span>

      <div className={'flex grid-cols-' + statusBarDivisions + ' h-3 drop-shadow-lg sm:w-80'}>

        {
          Array.isArray(statusIndex) &&
          statusIndex.map((length, index) =>
            <div className={
              index === 0 ?
                'bg-gray-600 border border-r-0.5 rounded-l-lg'
                : index === 1 ?
                  'bg-green-600 border border-r-0.5'
                  : index === 2 && statusBarDivisions === 3 ?
                    'bg-amber-600 border border-r-0.5 rounded-r-lg'
                    : index === 2 ?
                      'bg-amber-600 border border-r-0.5'
                      : index === 3 ?
                        'bg-purple-700 border border-r-0.5'
                        : index === 4 &&
                        'bg-red-400 border border-r-0.5 rounded-r-lg'

            } style={{ width: statuslengthArr[index] * 100 + 'px' }}>
            </div>

          )
        }

      </div>

      <div className='grid sm:grid-flow-col gap-4 justify-self-start text-xs'>
        {
          Array.isArray(statusIndex) &&
          statusIndex.map((role, index) =>
            <span key={index}>{role}</span>
          )
        }
      </div>
    </div>
  )
}

export default Statusbar