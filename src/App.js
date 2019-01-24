import React from 'react'
import { compose, withStateHandlers, lifecycle, withHandlers, mapProps } from 'recompose'
import { upperFirst, omit } from 'lodash'

const withFetcher = (name, fetch, fetchOnMount = false) => compose(
  withStateHandlers(
    {
      [`${name}Fetcher`]: {
        data: null,
        loading: false,
        error: null
      }
    },
    {
      [`receive${upperFirst(name)}Data`]: () => (data: any) => ({
        [`${name}Fetcher`]: {
          data,
          loading: false,
          error: null
        }        
      }),
      [`receive${upperFirst(name)}Error`]: ({
        [`${name}Fetcher`]: { data }
      }) => (error: any) => ({
        [`${name}Fetcher`]: {
          data,
          loading: false,
          error: error || true
        }      
      }),
      [`start${upperFirst(name)}Fetch`]: ({
        [`${name}Fetcher`]: prevState
      }) => () => ({
        [`${name}Fetcher`]: {
          ...prevState,
          loading: true
        }
      })
    }
  ),
  withHandlers({
    [`fetch${upperFirst(name)}`]: (props: any) => () => {
      props[`start${upperFirst(name)}Fetch`]()
      fetch(props).then(
        props[`receive${upperFirst(name)}Data`],
        props[`receive${upperFirst(name)}Error`]
      )
    }
  }),
  mapProps(props =>
    omit(props, [
      `receive${upperFirst(name)}Data`,
      `receive${upperFirst(name)}Error`,
      `start${upperFirst(name)}Fetch`
    ])
  ),
  lifecycle({
    componentDidMount() {
      this.props["fetch" + upperFirst(name)]()
    }
  })
)

const Test = props => {
  const isLoading = (props.testFetcher.loading === true) ? 
    "Loading..." : 
    "hello"
  console.log(props)
  return <div>
    { isLoading }
  </div>
}

export default compose(
  withFetcher(
    "test",
    async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        return await response.json();
      } catch (error) {
        throw error.message;
      }
    },
    { fetchOnMount: true }
  )
)(Test);
