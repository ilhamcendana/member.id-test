/** Frameworks */
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react';
/** Icons */
import { IoClose } from 'react-icons/io5';
import { FiPercent } from 'react-icons/fi';
import { CgMathEqual } from 'react-icons/cg';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
/** Libs */
import { evaluate } from 'mathjs';
import { useSelector } from 'react-redux';

/** Components */
import BeginPage from '@components/BeginPage';

const checkRegex = /^\d+$/;

export default function Home() {
  // Local state  
  const [calculateView, calculateViewSet] = useState('');
  const [input, inputSet] = useState('');
  const [result, resultSet] = useState(null);

  // store
  const globalState = useSelector(state => state.reducerMode);

  //func
  function addNumber(num) {
    inputSet(prev => checkRegex.test(prev.substring(prev.length - 1)) || prev.substring(prev.length - 1) === '.' ? prev + num : `${prev} ${num}`);
  }

  function addSymbol(sym) {
    if (checkRegex.test(input.substring(input.length - 1))) { // if the last character is number/int data type
      inputSet(prev => sym !== '%' && sym !== '.' ? `${prev} ${sym}` : `${prev}${sym}`);
    } else {
      if (input.substring(input.length - 1) !== '%' || input.substring(input.length - 1) !== '.') { // if the last character is not percent/comma char
        inputSet(prev => prev.replace(/.$/, sym));
      } else {
        if (sym !== '%' || sym !== '.') {
          inputSet(prev => `${prev} ${sym}`);
        }
      }
    }
  }

  function getResult(stringified) {
    if (checkRegex.test(stringified.substring(stringified.length - 1))) return evaluate(stringified);
  }

  //var
  const buttonItems = [
    {
      display: 'CLEAR',
      className: 'bg-sky-200 hover:bg-sky-300 w-2/4',
      onClick: () => {
        calculateViewSet('');
        inputSet('');
        resultSet(null);
      }
    },
    {
      display: '/',
      className: 'bg-amber-100 hover:bg-amber-200 flex-auto',
      onClick: () => addSymbol('/')
    },
    {
      display: <IoClose />,
      className: 'bg-amber-100 hover:bg-amber-200 flex-auto',
      onClick: () => addSymbol('*')
    },
    {
      display: '1',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('1')
    },
    {
      display: '2',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('2')
    },
    {
      display: '3',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('3')
    },
    {
      display: <AiOutlinePlus />,
      className: 'bg-amber-100 hover:bg-amber-200 flex-auto',
      onClick: () => addSymbol('+')
    },
    {
      display: '4',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('4')
    },
    {
      display: '5',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('5')
    },
    {
      display: '6',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('6')
    },
    {
      display: <AiOutlineMinus />,
      className: 'bg-amber-100 hover:bg-amber-200 flex-auto',
      onClick: () => addSymbol('-')
    },
    {
      display: '7',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('7')
    },
    {
      display: '8',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('8')
    },
    {
      display: '9',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('9')
    },
    {
      display: <FiPercent />,
      className: 'bg-amber-100 hover:bg-amber-200 flex-auto',
      onClick: () => {
        let splitted = input.split(" ");
        if (checkRegex.test(input.substring(input.length - 1))) {
          const afterDividedByHundred = parseInt(splitted[splitted.length - 1]) / 100;
          splitted[splitted.length - 1] = afterDividedByHundred;
          inputSet(splitted.join(" "));
        }
      }
    },
    {
      display: '+/-',
      className: 'bg-amber-100 hover:bg-amber-200 flex-auto',
      onClick: () => {
        let splitted = input.split(" ");
        if (checkRegex.test(input.substring(input.length - 1))) {
          if (parseInt(splitted[splitted.length - 1]) < 0) {
            splitted[splitted.length - 1] = parseInt(splitted[splitted.length - 1]) * -1
            inputSet(splitted.join(" "));
          } else {
            splitted[splitted.length - 1] = `-${splitted[splitted.length - 1]}`
            inputSet(splitted.join(" "));
          }
        }
      }
    },
    {
      display: '0',
      className: 'bg-sky-200 hover:bg-sky-300 flex-auto',
      onClick: () => addNumber('0')
    },
    {
      display: '.',
      className: 'bg-amber-100 hover:bg-amber-200 flex-auto',
      onClick: () => addSymbol('.')
    },
    {
      display: <CgMathEqual />,
      className: 'bg-amber-100 hover:bg-amber-200 flex-auto',
      onClick: () => {
        const stringified = input.toString().split(" ").join(" ");
        const theResult = getResult(stringified);
        inputSet(theResult.toString());
        resultSet(theResult);
        localStorage.setItem('last', theResult);
      }
    },
  ];

  //useeffect
  useEffect(() => {
    if (input) {
      const stringified = input.toString().split(" ").join(" ");
      calculateViewSet(stringified);
      resultSet(getResult(stringified));
    }
  }, [input]);

  const getLast = typeof window !== 'undefined' && localStorage.getItem('last');
  useEffect(() => {
    if (getLast) {
      inputSet(getLast);
    }
  }, [getLast])

  // if the global state return false
  if (!globalState?.isCalculatorOpen) return <BeginPage />

  return (
    <div>
      <Head>
        <title>Member.id test</title>
        <meta name="description" content="Generated by cendana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='min-h-screen'>
        {/* CONTAINER */}
        <div className='container mx-auto flex items-center justify-center min-h-screen'>
          {/* CALCULATOR */}
          <div className='w-full max-w-xs border border-blue-400 p-7'>
            {/* CALCULATE AND RESULTS CONTAINER */}
            <div className='flex flex-col gap-10'>
              {/* CALCULATE VIEW */}
              <div className='flex justify-end text-gray-400'>
                {calculateView && calculateView.replace('*', 'x')}
              </div>
              {/* CALCULATE VIEW */}
              {/* RESULTS */}
              <div className='flex h-10 justify-between items-center text-4xl text-gray-600 gap-2'>
                {result &&
                  <Fragment>
                    <p>=</p>
                    <p className='overflow-x-auto'>{result}</p>
                  </Fragment>
                }
              </div>
              {/*======== END: RESULTS */}
            </div>
            {/* ======== END:CALCULATE AND RESULTS CONTAINER */}
            <hr className='my-6 border-b border-b-gray-400' />
            {/* INSTRUMENT BUTTON */}
            <div className='flex flex-wrap gap-4'>
              {buttonItems.map((item, i) => (
                <button onClick={() => item.onClick()} className={`${item.className} btn btn-ghost flex items-center justify-center p-4 rounded-full ${!item.className.includes("w-") && 'w-12'} h-12 text-gray-500`} key={i}>{item.display}</button>
              ))}
            </div>
            {/* ======== END: INSTRUMENT BUTTON */}
          </div>
          {/* ======== END: CALCULATOR */}
        </div>
        {/* ======== END: CONTAINER */}
      </main>
    </div>
  )
}
