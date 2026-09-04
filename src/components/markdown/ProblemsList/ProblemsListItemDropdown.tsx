import Tippy from '@tippyjs/react';
import React from 'react';
import { Instance } from 'tippy.js';
import { useDarkMode } from '../../../context/DarkModeContext';
import { getProblemURL, ProblemInfo } from '../../../models/problem';
import { DivisionProblemInfo } from './DivisionList/DivisionProblemInfo';
import ProblemListItemSolution from './ProblemListItemSolution';
import { ProblemsListItemProps } from './ProblemsListItem';

export default function ProblemsListItemDropdown(
  props: ProblemsListItemProps & { isFocusProblem: boolean }
) {
  const [isClient, setIsClient] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const { problem, isDivisionTable, isFocusProblem } = props;
  const darkMode = useDarkMode();

  const solutionContent = isFocusProblem ? (
    <></>
  ) : isDivisionTable ? (
    <></>
  ) : (
    <ProblemListItemSolution
      problem={props.problem}
      onShowSolutionSketch={props.onShowSolutionSketch}
    />
  );

  const tippyRef = React.useRef<Instance | null>(null);
  const [isDropdownShown, setIsDropdownShown] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-400"
        aria-label="Problem actions"
        type="button"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    );
  }

  return (
    <Tippy
      onCreate={tippy => (tippyRef.current = tippy)}
      content={
        isDropdownShown ? (
          <div className="-mx-2 text-left">
            {solutionContent}
            <a
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden dark:text-gray-300 dark:hover:bg-gray-800"
              href="https://artofproblemsolving.com/community"
              target="_blank"
              rel="noreferrer"
            >
              Discuss on AoPS
            </a>
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-hidden dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={e => {
                e.preventDefault();
                setCopied(true);
                navigator.clipboard.writeText(
                  window.location.href.split(/[?#]/)[0] +
                    '#problem-' +
                    problem.uniqueId
                );
              }}
            >
              {copied ? 'Copied!' : 'Copy Permalink'}
            </button>
          </div>
        ) : (
          ''
        )
      }
      theme={darkMode ? 'dark' : 'light'}
      placement="bottom-end"
      arrow={true}
      animation="fade"
      trigger="click"
      interactive={true}
      onShow={() => setIsDropdownShown(true)}
      onHidden={() => setIsDropdownShown(false)}
      appendTo={() => document.body}
    >
      <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-400 hover:text-gray-500 focus:outline-hidden dark:hover:text-gray-300">
        {/* Heroicon name: solid/dots-vertical */}
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </Tippy>
  );
}
