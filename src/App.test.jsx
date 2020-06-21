import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

const renderApp = () => {
  const { container, getByPlaceholderText, getByText } = render(
    <App />,
  );

  return {
    container,
    getByPlaceholderText,
    getByText,
  };
};

describe('', () => {
  test('todo 추가 버튼 클릭 검사', () => {
    const todo = 'App.js 코드 테스트';
    const { container, getByPlaceholderText, getByText } = renderApp();
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const button = getByText('추가');

    fireEvent.change(input, { target: { value: todo } });

    expect(input).toHaveAttribute('value', todo);

    fireEvent.click(button);

    expect(input).toHaveAttribute('value', '');
    expect(container).toHaveTextContent(todo);
  });

  test('todo 완료 버튼 클릭 검사', () => {
    const todo = 'App.js 코드 테스트';
    const { container, getByPlaceholderText, getByText } = renderApp();
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = getByText('추가');

    fireEvent.change(input, { target: { value: todo } });
    fireEvent.click(addButton);

    const completeButton = getByText('완료');

    expect(container).toHaveTextContent(todo);

    fireEvent.click(completeButton);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
