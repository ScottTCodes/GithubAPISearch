import React from "react"
import {
  render,
  screen,
} from '@testing-library/react'
import Repository, { IRepository } from './index'

const renderRepository = (props: Partial<IRepository> = {
    name: 'Arctic Shores Repository',
    author: 'ScottTCodes',
    stars: '69',
    watchers: '420',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
  }) => {
    const defaultProps: IRepository = {
      name: 'Arctic Shores Repository',
      author: 'ScottTCodes',
      stars: '69',
      watchers: '420',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
    };

    return render(<Repository {...defaultProps} {...props} />)
}

describe("<Repository />", () => {
  test("should render data from API", async () => {
    const { asFragment } = renderRepository();

    expect(asFragment()).toMatchSnapshot();
  });
})
