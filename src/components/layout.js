import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Spring } from 'react-spring';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Archive from './archive';
import Header from './header';
import './layout.css';

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`;

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        file(relativePath: { regex: "/bg/" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Spring 
          from={{ height: location.pathname === '/' ? 100 : 200 }} 
          to={{height: location.pathname === '/' ? 200 : 100 }}
        >
        {styles => (
          <div style={{overflow: 'hidden',...styles}}>
            <Img fluid={data.file.childImageSharp.fluid} />
          </div>
        )}
        </Spring>
        {/*{location.pathname === '/' && (
          
        )}*/}

        <MainLayout>
          <div>{children}</div>
          <Archive />
        </MainLayout>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  location: {}
};

export default Layout;
