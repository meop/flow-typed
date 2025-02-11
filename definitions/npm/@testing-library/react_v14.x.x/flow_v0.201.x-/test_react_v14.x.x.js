// @flow

import * as React from 'react';
import {
  act,
  render,
  fireEvent,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  within,
  screen,
  getNodeText,
  type IntersectionHTMLElement,
} from '@testing-library/react';
import { describe, it } from 'flow-typed-test';

describe('act', () => {
  it('should fail on invalid inputs', () => {
    // $FlowExpectedError[incompatible-call]
    act(1);
    // $FlowExpectedError[extra-arg]
    act(() => {}, 1);
    // $FlowExpectedError[incompatible-call]
    act(() => 1);
  });

  it('should pass on correct inputs', () => {
    act(() => {});
    act(() => Promise.resolve());
    act(() => ({
      then: (resolve: () => mixed) => {},
    }));
  });

  it('should fail on incorrect usage of result', () => {
    // $FlowExpectedError[unsafe-addition]
    act(() => {}) + 1;
    // $FlowExpectedError[prop-missing]
    act(() => {}).doesNotExist();
    // $FlowExpectedError[incompatible-call]
    act(() => {}).then(1);
    // $FlowExpectedError[incompatible-call]
    act(() => {}).then(() => {}, 1);
  });

  it('should pass on correct usage of result', () => {
    act(() => {}).then(() => {});
    act(() => {}).then(
      () => {},
      () => {}
    );
  });
});

describe('waitFor', () => {
  it('should fail on invalid inputs', () => {
    // $FlowExpectedError[incompatible-call]
    waitFor(1);
    // $FlowExpectedError[incompatible-call]
    waitFor(() => {}, 1);
  });

  it('should pass on correct inputs', () => {
    waitFor(() => {});
    waitFor(() => {}, { timeout: 1 });
  });
});

describe('waitForElementToBeRemoved', () => {
  it('should fail on invalid inputs', () => {
    // $FlowExpectedError[incompatible-call]
    waitForElementToBeRemoved(() => {}, 1);
  });

  it('should pass on correct inputs (callback)', () => {
    waitForElementToBeRemoved(() => document.createElement('div'));
    waitForElementToBeRemoved(() => document.createElement('div'), {
      container: document.createElement('div'),
      timeout: 100,
    });
  });

  it('should pass on correct inputs (node)', () => {
    waitForElementToBeRemoved(document.createElement('div'));
    waitForElementToBeRemoved(document.createElement('div'), {
      container: document.createElement('div'),
      timeout: 100,
    });
  });

  it('should return a usable value.', async (n) => {
    const usernameElement = await waitForElementToBeRemoved(() =>
      document.createElement('input')
    );

    usernameElement.value = 'chucknorris';
  });
});

describe('render', () => {
  class Component extends React.Component<{ ... }> {}
  const {
    container,
    unmount,
    baseElement,
    asFragment,
    debug,
    rerender,
    getByAltText,
    getAllByAltText,
    queryByAltText,
    queryAllByAltText,
    findByAltText,
    findAllByAltText,
    getByDisplayValue,
    getAllByDisplayValue,
    queryByDisplayValue,
    queryAllByDisplayValue,
    findByDisplayValue,
    findAllByDisplayValue,
    getByLabelText,
    getAllByLabelText,
    queryByLabelText,
    queryAllByLabelText,
    findByLabelText,
    findAllByLabelText,
    getByPlaceholderText,
    getAllByPlaceholderText,
    queryByPlaceholderText,
    queryAllByPlaceholderText,
    findByPlaceholderText,
    findAllByPlaceholderText,
    getByRole,
    getAllByRole,
    queryByRole,
    queryAllByRole,
    findByRole,
    findAllByRole,
    getByTestId,
    getAllByTestId,
    queryByTestId,
    queryAllByTestId,
    findByTestId,
    findAllByTestId,
    getByText,
    getAllByText,
    queryByText,
    queryAllByText,
    findByText,
    findAllByText,
    getByTitle,
    getAllByTitle,
    queryByTitle,
    queryAllByTitle,
    findByTitle,
    findAllByTitle,
  } = render(<Component />);

  it('unmount should has 0 arguments', () => {
    unmount();
    // $FlowExpectedError[extra-arg]
    unmount(1);
  });

  it('container should be an html element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: number = container;
    const b: HTMLElement = container;
  });

  it('baseElement should be an html element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: number = baseElement;
    const b: HTMLElement = baseElement;
  });

  it('asFragment should return a document fragment', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = asFragment();
    const b: DocumentFragment = asFragment();
  });

  it('debug maybe has 1 argument an html element', () => {
    // $FlowExpectedError[incompatible-call]
    debug(1);
    debug(container);
  });

  it('rerender should has 1 argument an react element', () => {
    // $FlowExpectedError[incompatible-call]
    rerender();
    rerender(<Component />);
  });

  it('getByAltText should return HTML element', () => {
    const a: IntersectionHTMLElement = getByAltText('1');
  });

  it('getAllByAltText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = getAllByAltText('1');
    const b: Array<IntersectionHTMLElement> = getAllByAltText('2');
  });

  it('queryByAltText should return maybe HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryByAltText('1');
    const b: ?IntersectionHTMLElement = queryByAltText('2');
  });

  it('queryAllByAltText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryAllByAltText('1');
    const b: Array<IntersectionHTMLElement> = queryAllByAltText('2');
  });

  it('findByAltText should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findByAltText('1');
    const b: Promise<IntersectionHTMLElement> = findByAltText('1');
  });

  it('findAllByAltText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type-arg]
    const a: Promise<IntersectionHTMLElement> = findAllByAltText('1');
    const b: Promise<Array<IntersectionHTMLElement>> = findAllByAltText('2');
  });

  it('getByDisplayValue should return HTML element', () => {
    const a: IntersectionHTMLElement = getByDisplayValue('1');
  });

  it('getAllByDisplayValue should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = getAllByDisplayValue('1');
    const b: Array<IntersectionHTMLElement> = getAllByDisplayValue('2');
  });

  it('queryByDisplayValue should return maybe HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryByDisplayValue('1');
    const b: ?IntersectionHTMLElement = queryByDisplayValue('2');
  });

  it('queryAllByDisplayValue should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryAllByDisplayValue('1');
    const b: Array<IntersectionHTMLElement> = queryAllByDisplayValue('2');
  });

  it('findByDisplayValue should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findByDisplayValue('1');
    const b: Promise<IntersectionHTMLElement> = findByDisplayValue('1');
  });

  it('findAllByDisplayValue should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type-arg]
    const a: Promise<IntersectionHTMLElement> = findAllByDisplayValue('1');
    const b: Promise<Array<IntersectionHTMLElement>> = findAllByDisplayValue('2');
  });

  it('getByLabelText should return HTML element', () => {
    const a: IntersectionHTMLElement = getByLabelText('1');
  });

  it('getAllByLabelText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = getAllByLabelText('1');
    const b: Array<IntersectionHTMLElement> = getAllByLabelText('2');
  });

  it('queryByLabelText should return maybe HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryByLabelText('1');
    const b: ?IntersectionHTMLElement = queryByLabelText('2');
  });

  it('queryAllByLabelText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryAllByLabelText('1');
    const b: Array<IntersectionHTMLElement> = queryAllByLabelText('2');
  });

  it('findByLabelText should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findByLabelText('1');
    const b: Promise<IntersectionHTMLElement> = findByLabelText('1');
  });

  it('findAllByLabelText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type-arg]
    const a: Promise<IntersectionHTMLElement> = findAllByLabelText('1');
    const b: Promise<Array<IntersectionHTMLElement>> = findAllByLabelText('2');
  });

  it('getByPlaceholderText should return HTML element', () => {
    const a: IntersectionHTMLElement = getByPlaceholderText('1');
  });

  it('getAllByPlaceholderText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = getAllByPlaceholderText('1');
    const b: Array<IntersectionHTMLElement> = getAllByPlaceholderText('2');
  });

  it('queryByPlaceholderText should return maybe HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryByPlaceholderText('1');
    const b: ?IntersectionHTMLElement = queryByPlaceholderText('2');
  });

  it('queryAllByPlaceholderText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryAllByPlaceholderText('1');
    const b: Array<IntersectionHTMLElement> = queryAllByPlaceholderText('2');
  });

  it('findByPlaceholderText should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findByPlaceholderText('1');
    const b: Promise<IntersectionHTMLElement> = findByPlaceholderText('1');
  });

  it('findAllByPlaceholderText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type-arg]
    const a: Promise<IntersectionHTMLElement> = findAllByPlaceholderText('1');
    const b: Promise<Array<IntersectionHTMLElement>> = findAllByPlaceholderText('2');
  });

  it('getByRole should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: string = getByRole('button');
    const b: IntersectionHTMLElement = getByRole('button');
  });

  it('getAllByRole should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = getAllByRole('button');
    const b: Array<IntersectionHTMLElement> = getAllByRole('button');
  });

  it('queryByRole should return maybe HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryByRole('button');
    const b: ?IntersectionHTMLElement = queryByRole('button');
  });

  it('queryAllByRole should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryAllByRole('button');
    const b: Array<IntersectionHTMLElement> = queryAllByRole('button');
  });

  it('findByRole should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findByRole('button');
    const b: Promise<IntersectionHTMLElement> = findByRole('button');
  });

  it('findAllByRole should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type-arg]
    const a: Promise<IntersectionHTMLElement> = findAllByRole('button');
    const b: Promise<Array<IntersectionHTMLElement>> = findAllByRole('button');
  });

  it('getByTestId should return HTML element', () => {
    const a: IntersectionHTMLElement = getByTestId('1');
  });

  it('getByTestId returns a mixed HTML type', () => {
    const a = getByTestId('1');
    a.value;
    a.disabled;
    a.href;
  });

  it('getAllByTestId should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = getAllByTestId('1');
    const b: Array<IntersectionHTMLElement> = getAllByTestId('2');
  });

  it('queryByTestId should return maybe HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryByTestId('1');
    const b: ?IntersectionHTMLElement = queryByTestId('2');
  });

  it('queryAllByTestId should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryAllByTestId('1');
    const b: Array<IntersectionHTMLElement> = queryAllByTestId('2');
  });

  it('findByTestId should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findByTestId('1');
    const b: Promise<IntersectionHTMLElement> = findByTestId('1');
  });

  it('findAllByTestId should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findAllByTestId('1');
    const b: Promise<Array<IntersectionHTMLElement>> = findAllByTestId('2');
  });

  it('getByText should return HTML element', () => {
    const a: IntersectionHTMLElement = getByText('1');
  });

  it('getAllByText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = getAllByText('1');
    const b: Array<IntersectionHTMLElement> = getAllByText('2');
  });

  it('queryByText should return maybe HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryByText('1');
    const b: ?IntersectionHTMLElement = queryByText('2');
  });

  it('queryAllByText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryAllByText('1');
    const b: Array<IntersectionHTMLElement> = queryAllByText('2');
  });

  it('findByText should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findByText('1');
    const b: Promise<IntersectionHTMLElement> = findByText('1');
  });

  it('findAllByText should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type-arg]
    const a: Promise<IntersectionHTMLElement> = findAllByText('1');
    const b: Promise<Array<IntersectionHTMLElement>> = findAllByText('2');
  });

  it('getByTitle should return HTML element', () => {
    const a: IntersectionHTMLElement = getByTitle('1');
  });

  it('getAllByTitle should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = getAllByTitle('1');
    const b: Array<IntersectionHTMLElement> = getAllByTitle('2');
  });

  it('queryByTitle should return maybe HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryByTitle('1');
    const b: ?IntersectionHTMLElement = queryByTitle('2');
  });

  it('queryAllByTitle should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = queryAllByTitle('1');
    const b: Array<IntersectionHTMLElement> = queryAllByTitle('2');
  });

  it('findByTitle should return HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findByTitle('1');
    const b: Promise<IntersectionHTMLElement> = findByTitle('1');
  });

  it('findAllByTitle should return array of HTML element', () => {
    // $FlowExpectedError[incompatible-type]
    const a: IntersectionHTMLElement = findAllByTitle('1');
    const b: Promise<Array<IntersectionHTMLElement>> = findAllByTitle('2');
  });
});

describe('cleanup', () => {
  it('should be a function w/o arguments', () => {
    cleanup();
    // $FlowExpectedError[extra-arg]
    cleanup(1);
  });
});

describe('within', () => {
  class Component extends React.Component<{ ... }> {}
  const { container } = render(<Component />);

  it('should has html element as argument', () => {
    // $FlowExpectedError[incompatible-call]
    within();
    within(container);
  });

  it('should have getByAltText', () => {
    within(container).getByAltText('1');
  });

  it('should have getAllByAltText', () => {
    within(container).getAllByAltText('1');
  });

  it('should have queryByAltText', () => {
    within(container).queryByAltText('1');
  });

  it('should have queryAllByAltText', () => {
    within(container).queryAllByAltText('1');
  });

  it('should have findByAltText', async () => {
    await within(container).findByAltText('1');
  });

  it('should have findAllByAltText', async () => {
    await within(container).findAllByAltText('1');
  });

  it('should have getByDisplayValue', () => {
    within(container).getByDisplayValue('1');
  });

  it('should have getAllByDisplayValue', () => {
    within(container).getAllByDisplayValue('1');
  });

  it('should have queryByDisplayValue', () => {
    within(container).queryByDisplayValue('1');
  });

  it('should have queryAllByDisplayValue', () => {
    within(container).queryAllByDisplayValue('1');
  });

  it('should have findByDisplayValue', async () => {
    await within(container).findByDisplayValue('1');
  });

  it('should have findAllByDisplayValue', async () => {
    await within(container).findAllByDisplayValue('1');
  });

  it('should have getByLabelText', () => {
    within(container).getByLabelText('1');
  });

  it('should have getAllByLabelText', () => {
    within(container).getAllByLabelText('1');
  });

  it('should have queryByLabelText', () => {
    within(container).queryByLabelText('1');
  });

  it('should have queryAllByLabelText', () => {
    within(container).queryAllByLabelText('1');
  });

  it('should have findByLabelText', async () => {
    await within(container).findByLabelText('1');
  });

  it('should have findAllByLabelText', async () => {
    await within(container).findAllByLabelText('1');
  });

  it('should have getByPlaceholderText', () => {
    within(container).getByPlaceholderText('1');
  });

  it('should have getAllByPlaceholderText', () => {
    within(container).getAllByPlaceholderText('1');
  });

  it('should have queryByPlaceholderText', () => {
    within(container).queryByPlaceholderText('1');
  });

  it('should have queryAllByPlaceholderText', () => {
    within(container).queryAllByPlaceholderText('1');
  });

  it('should have findByPlaceholderText', async () => {
    await within(container).findByPlaceholderText('1');
  });

  it('should have findAllByPlaceholderText', async () => {
    await within(container).findAllByPlaceholderText('1');
  });

  it('should have getByRole', () => {
    within(container).getByRole('button');
  });

  it('should have getAllByRole', () => {
    within(container).getAllByRole('button');
  });

  it('should have queryByRole', () => {
    within(container).queryByRole('button');
  });

  it('should have queryAllByRole', () => {
    within(container).queryAllByRole('button');
  });

  it('should have findByRole', async () => {
    await within(container).findByRole('button');
  });

  it('should have findAllByRole', async () => {
    await within(container).findAllByRole('button');
  });

  it('should have getByTestId', () => {
    within(container).getByTestId('1');
  });

  it('should have getAllByTestId', () => {
    within(container).getAllByTestId('1');
  });

  it('should have queryByTestId', () => {
    within(container).queryByTestId('1');
  });

  it('should have queryAllByTestId', () => {
    within(container).queryAllByTestId('1');
  });

  it('should have findByTestId', async () => {
    await within(container).findByTestId('1');
  });

  it('should have findAllByTestId', async () => {
    await within(container).findAllByTestId('1');
  });

  it('should have getByText', () => {
    within(container).getByText('1');
  });

  it('should have getAllByText', () => {
    within(container).getAllByText('1');
  });

  it('should have queryByText', () => {
    within(container).queryByText('1');
  });

  it('should have queryAllByText', () => {
    within(container).queryAllByText('1');
  });

  it('should have findByText', async () => {
    await within(container).findByText('1');
  });

  it('should have findAllByText', async () => {
    await within(container).findAllByText('1');
  });

  it('should have getByTitle', () => {
    within(container).getByTitle('1');
  });

  it('should have getAllByTitle', () => {
    within(container).getAllByTitle('1');
  });

  it('should have queryByTitle', () => {
    within(container).queryByTitle('1');
  });

  it('should have queryAllByTitle', () => {
    within(container).queryAllByTitle('1');
  });

  it('should have findByTitle', async () => {
    await within(container).findByTitle('1');
  });

  it('should have findAllByTitle', async () => {
    await within(container).findAllByTitle('1');
  });

  it('should have getByDisplayValue', () => {
    within(container).getByDisplayValue('1');
  });

  it('should have getAllByDisplayValue', () => {
    within(container).getAllByDisplayValue('1');
  });

  it('should have queryByDisplayValue', () => {
    within(container).queryByDisplayValue('1');
  });

  it('should have queryAllByDisplayValue', () => {
    within(container).queryAllByDisplayValue('1');
  });

  it('should have findByDisplayValue', async () => {
    await within(container).findByDisplayValue('1');
  });

  it('should have findAllByDisplayValue', async () => {
    await within(container).findAllByDisplayValue('1');
  });
});

describe('screen', () => {
  it('should have all the queries available', () => {
    // $FlowExpectedError[prop-missing]
    const { notAQuery } = screen;
    const {
      debug,
      getByAltText,
      getAllByAltText,
      queryByAltText,
      queryAllByAltText,
      findByAltText,
      findAllByAltText,
      getByDisplayValue,
      getAllByDisplayValue,
      queryByDisplayValue,
      queryAllByDisplayValue,
      findByDisplayValue,
      findAllByDisplayValue,
      getByLabelText,
      getAllByLabelText,
      queryByLabelText,
      queryAllByLabelText,
      findByLabelText,
      findAllByLabelText,
      getByPlaceholderText,
      getAllByPlaceholderText,
      queryByPlaceholderText,
      queryAllByPlaceholderText,
      findByPlaceholderText,
      findAllByPlaceholderText,
      getByRole,
      getAllByRole,
      queryByRole,
      queryAllByRole,
      findByRole,
      findAllByRole,
      getByTestId,
      getAllByTestId,
      queryByTestId,
      queryAllByTestId,
      findByTestId,
      findAllByTestId,
      getByText,
      getAllByText,
      queryByText,
      queryAllByText,
      findByText,
      findAllByText,
      getByTitle,
      getAllByTitle,
      queryByTitle,
      queryAllByTitle,
      findByTitle,
      findAllByTitle,
    } = screen;
  });
});

describe('fireEvent', () => {
  const htmlEl = document.createElement('div');

  it('should be callable', () => {
    fireEvent(
      htmlEl,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  it('should throw on invalid arguments', () => {
    // $FlowExpectedError[incompatible-call]
    fireEvent(1);
    // $FlowExpectedError[incompatible-call]
    fireEvent(htmlEl, 1);
  });

  it('should expose fire event helpers', () => {
    fireEvent.copy(htmlEl);
    fireEvent.cut(htmlEl);
    fireEvent.paste(htmlEl);
    fireEvent.compositionEnd(htmlEl);
    fireEvent.compositionStart(htmlEl);
    fireEvent.compositionUpdate(htmlEl);
    fireEvent.keyDown(htmlEl);
    fireEvent.keyPress(htmlEl);
    fireEvent.keyUp(htmlEl);
    fireEvent.focus(htmlEl);
    fireEvent.blur(htmlEl);
    fireEvent.change(htmlEl);
    fireEvent.input(htmlEl);
    fireEvent.invalid(htmlEl);
    fireEvent.submit(htmlEl);
    fireEvent.click(htmlEl);
    fireEvent.contextMenu(htmlEl);
    fireEvent.dblClick(htmlEl);
    fireEvent.doubleClick(htmlEl);
    fireEvent.drag(htmlEl);
    fireEvent.dragEnd(htmlEl);
    fireEvent.dragEnter(htmlEl);
    fireEvent.dragExit(htmlEl);
    fireEvent.dragLeave(htmlEl);
    fireEvent.dragOver(htmlEl);
    fireEvent.dragStart(htmlEl);
    fireEvent.drop(htmlEl);
    fireEvent.mouseDown(htmlEl);
    fireEvent.mouseEnter(htmlEl);
    fireEvent.mouseLeave(htmlEl);
    fireEvent.mouseMove(htmlEl);
    fireEvent.mouseOut(htmlEl);
    fireEvent.mouseOver(htmlEl);
    fireEvent.mouseUp(htmlEl);
    fireEvent.select(htmlEl);
    fireEvent.touchCancel(htmlEl);
    fireEvent.touchEnd(htmlEl);
    fireEvent.touchMove(htmlEl);
    fireEvent.touchStart(htmlEl);
    fireEvent.scroll(htmlEl);
    fireEvent.wheel(htmlEl);
    fireEvent.abort(htmlEl);
    fireEvent.canPlay(htmlEl);
    fireEvent.canPlayThrough(htmlEl);
    fireEvent.durationChange(htmlEl);
    fireEvent.emptied(htmlEl);
    fireEvent.encrypted(htmlEl);
    fireEvent.ended(htmlEl);
    fireEvent.loadedData(htmlEl);
    fireEvent.loadedMetadata(htmlEl);
    fireEvent.loadStart(htmlEl);
    fireEvent.pause(htmlEl);
    fireEvent.play(htmlEl);
    fireEvent.playing(htmlEl);
    fireEvent.progress(htmlEl);
    fireEvent.rateChange(htmlEl);
    fireEvent.seeked(htmlEl);
    fireEvent.seeking(htmlEl);
    fireEvent.stalled(htmlEl);
    fireEvent.suspend(htmlEl);
    fireEvent.timeUpdate(htmlEl);
    fireEvent.volumeChange(htmlEl);
    fireEvent.waiting(htmlEl);
    fireEvent.load(htmlEl);
    fireEvent.error(htmlEl);
    fireEvent.animationStart(htmlEl);
    fireEvent.animationEnd(htmlEl);
    fireEvent.animationIteration(htmlEl);
    fireEvent.transitionEnd(htmlEl);
  });
});

describe('getNodeText', () => {
  class Component extends React.Component<{ ... }> {}
  const { container } = render(<Component />);

  it('should return string', () => {
    const a: string = getNodeText(container);
  });
});

describe('text matching API', () => {
  class Component extends React.Component<{ ... }> {}
  const {
    getByAltText,
    getAllByAltText,
    queryByAltText,
    queryAllByAltText,
    findByAltText,
    findAllByAltText,
    getByDisplayValue,
    getAllByDisplayValue,
    queryByDisplayValue,
    queryAllByDisplayValue,
    findByDisplayValue,
    findAllByDisplayValue,
    getByLabelText,
    getAllByLabelText,
    queryByLabelText,
    queryAllByLabelText,
    findByLabelText,
    findAllByLabelText,
    getByPlaceholderText,
    getAllByPlaceholderText,
    queryByPlaceholderText,
    queryAllByPlaceholderText,
    findByPlaceholderText,
    findAllByPlaceholderText,
    getByRole,
    getAllByRole,
    queryByRole,
    queryAllByRole,
    findByRole,
    findAllByRole,
    getByTestId,
    getAllByTestId,
    queryByTestId,
    queryAllByTestId,
    findByTestId,
    findAllByTestId,
    getByText,
    getAllByText,
    queryByText,
    queryAllByText,
    findByText,
    findAllByText,
    getByTitle,
    getAllByTitle,
    queryByTitle,
    queryAllByTitle,
    findByTitle,
    findAllByTitle,
  } = render(<Component />);

  it('getByAltText should accept text match arguments', () => {
    getByAltText('1');
    getByAltText('1', { trim: true, collapseWhitespace: true, exact: true });
    getByAltText(/1/);
    getByAltText(/1/, { trim: true, collapseWhitespace: true, exact: true });
    getByAltText((content: string, element) => true);
    getByAltText((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('getAllByAltText should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = getAllByAltText('1');
  });

  it('queryByAltText should accept text match arguments', () => {
    queryByAltText('1');
    queryByAltText('1', { trim: true, collapseWhitespace: true, exact: true });
    queryByAltText(/1/);
    queryByAltText(/1/, { trim: true, collapseWhitespace: true, exact: true });
    queryByAltText((content: string, element) => true);
    queryByAltText((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('queryAllByAltText should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = queryAllByAltText('1');
  });

  it('getByDisplayValue should accept text match arguments', () => {
    getByDisplayValue('1');
    getByDisplayValue('1', {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    getByDisplayValue(/1/);
    getByDisplayValue(/1/, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    getByDisplayValue((content: string, element) => true);
    getByDisplayValue((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('getAllByDisplayValue should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = getAllByDisplayValue('1');
  });

  it('queryByDisplayValue should accept text match arguments', () => {
    queryByDisplayValue('1');
    queryByDisplayValue('1', {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    queryByDisplayValue(/1/);
    queryByDisplayValue(/1/, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    queryByDisplayValue((content: string, element) => true);
    queryByDisplayValue((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('queryAllByDisplayValue should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = queryAllByDisplayValue('1');
  });

  it('getByLabelText should accept text match arguments', () => {
    getByLabelText('1');
    getByLabelText('1', { trim: true, collapseWhitespace: true, exact: true });
    getByLabelText(/1/);
    getByLabelText(/1/, { trim: true, collapseWhitespace: true, exact: true });
    getByLabelText((content: string, element) => true);
    getByLabelText((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
      selector: 'A',
    });
  });

  it('getAllByLabelText should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = getAllByLabelText('1');
  });

  it('queryByLabelText should accept text match arguments', () => {
    queryByLabelText('1');
    queryByLabelText('1', {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    queryByLabelText(/1/);
    queryByLabelText(/1/, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
      selector: 'A',
    });
    queryByLabelText((content: string, element) => true);
    queryByLabelText((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
      selector: 'A',
    });
  });

  it('queryAllByLabelText should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = queryAllByLabelText('1');
  });

  it('getByPlaceholderText should accept text match arguments', () => {
    getByPlaceholderText('1');
    getByPlaceholderText('1', {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    getByPlaceholderText(/1/);
    getByPlaceholderText(/1/, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    getByPlaceholderText((content: string, element) => true);
    getByPlaceholderText((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('getAllByPlaceholderText should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = getAllByPlaceholderText('1');
  });

  it('queryByPlaceholderText should accept text match arguments', () => {
    queryByPlaceholderText('1');
    queryByPlaceholderText('1', {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    queryByPlaceholderText(/1/);
    queryByPlaceholderText(/1/, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
    queryByPlaceholderText((content: string, element) => true);
    queryByPlaceholderText((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('queryAllByPlaceholderText should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = queryAllByPlaceholderText('1');
  });

  it('getByRole should accept by role arguments', () => {
    getByRole('button');
    getByRole('button', { hidden: true });

    // $FlowExpectedError[incompatible-call] only takes string
    getByRole((content: string) => true);
    // $FlowExpectedError[incompatible-call] only takes string
    getByRole((content: string) => true, {
      hidden: true,
    });
  });

  it('getAllByRole should accept by role arguments', () => {
    const result: Array<IntersectionHTMLElement> = getAllByRole('button');
  });

  it('queryByRole should accept by role arguments', () => {
    queryByRole('button');
    queryByRole('button', { hidden: true });

    // $FlowExpectedError[incompatible-call] only takes string
    queryByRole((content: string) => true);
    // $FlowExpectedError[incompatible-call] only takes string
    queryByRole((content: string) => true, {
      hidden: true,
    });
  });

  it('queryAllByRole should accept by role arguments', () => {
    const result: Array<IntersectionHTMLElement> = queryAllByRole('button');
  });

  it('getByTestId should accept text match arguments', () => {
    getByTestId('1');
    getByTestId('1', { trim: true, collapseWhitespace: true, exact: true });
    getByTestId(/1/);
    getByTestId(/1/, { trim: true, collapseWhitespace: true, exact: true });
    getByTestId((content: string, element) => true);
    getByTestId((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('getAllByTestId should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = getAllByTestId('1');
  });

  it('queryByTestId should accept text match arguments', () => {
    queryByTestId('1');
    queryByTestId('1', { trim: true, collapseWhitespace: true, exact: true });
    queryByTestId(/1/);
    queryByTestId(/1/, { trim: true, collapseWhitespace: true, exact: true });
    queryByTestId((content: string, element) => true);
    queryByTestId((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('queryAllByTestId should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = queryAllByTestId('1');
  });

  it('getByText should accept text match arguments', () => {
    getByText('1');
    getByText('1', { trim: true, collapseWhitespace: true, exact: true });
    getByText(/1/);
    getByText(/1/, { trim: true, collapseWhitespace: true, exact: true });
    getByText((content: string, element) => true);
    getByText((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
      selector: 'A',
    });
  });

  it('getAllByText should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = getAllByText('1');
  });

  it('queryByText should accept text match arguments', () => {
    queryByText('1');
    queryByText('1', { trim: true, collapseWhitespace: true, exact: true });
    queryByText(/1/);
    queryByText(/1/, { trim: true, collapseWhitespace: true, exact: true });
    queryByText((content: string, element) => true);
    queryByText((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
      selector: 'A',
    });
  });

  it('queryAllByText should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = queryAllByText('1');
  });

  it('getByTitle should accept text match arguments', () => {
    getByTitle('1');
    getByTitle('1', { trim: true, collapseWhitespace: true, exact: true });
    getByTitle(/1/);
    getByTitle(/1/, { trim: true, collapseWhitespace: true, exact: true });
    getByTitle((content: string, element) => true);
    getByTitle((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('getAllByTitle should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = getAllByTitle('1');
  });

  it('queryByTitle should accept text match arguments', () => {
    queryByTitle('1');
    queryByTitle('1', { trim: true, collapseWhitespace: true, exact: true });
    queryByTitle(/1/);
    queryByTitle(/1/, { trim: true, collapseWhitespace: true, exact: true });
    queryByTitle((content: string, element) => true);
    queryByTitle((content: string, element) => true, {
      trim: true,
      collapseWhitespace: true,
      exact: true,
    });
  });

  it('queryAllByTitle should accept text match arguments', () => {
    const result: Array<IntersectionHTMLElement> = queryAllByTitle('1');
  });
});

describe('render() parameters', () => {
  class Component extends React.Component<{ ... }> {}

  it('allows supplying parameters to render()', () => {
    class CustomWrapper extends React.Component<{ ... }> {}
    const element = document.createElement('div');
    render(<Component />, {
      baseElement: element,
      container: element,
      hydrate: true,
      wrapper: CustomWrapper,
    });
  });

  it('allows overriding render() with custom queries', () => {
    type CustomReturnType = 123456;
    declare var customValue: CustomReturnType;
    const customQueries = {
      getByOverride: (param1: string) => customValue,
    };
    const result = render<{|
      getByOverride: (string) => CustomReturnType,
    |}>(<Component />, { queries: customQueries });
    const a: CustomReturnType = result.getByOverride('something');
    // $FlowExpectedError[incompatible-call] bad type for getByOverride parameter
    result.getByOverride(1234);
    // $FlowExpectedError[incompatible-call] missing getByOverride parameter
    result.getByOverride();
    // $FlowExpectedError[prop-missing] default queries are not available when using custom queries
    result.getByTestId('indifferent');
  });
});
