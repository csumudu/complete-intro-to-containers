import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";

import "bootstrap/dist/css/bootstrap.css";
import "prismjs/themes/prism-solarizedlight.css";
import "code-mirror-themes/themes/monokai.css";
import "./index.css";

const TemplateWrapper = props => {
  return (
    <StaticQuery
      render={data => (
        <div>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {
                name: "description",
                content: data.site.siteMetadata.description
              },
              {
                name: "keywords",
                content: data.site.siteMetadata.keywords.join(", ")
              }
            ]}
          />
          <div className="navbar navbar-light gradient">
            <Link to="/" className="navbar-brand">
              <h1>{data.site.siteMetadata.title}</h1>
            </Link>
            {!(props.data && props.data.markdownRemark) ? null : (
              <h2>{`${props.data.markdownRemark.frontmatter.section} – ${props.data.markdownRemark.frontmatter.title}`}</h2>
            )}
          </div>
          <div className="main">{props.children}</div>
        </div>
      )}
      query={graphql`
        query HomePage($path: String!) {
          markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
              path
              title
              order
              section
            }
          }
          site {
            siteMetadata {
              title
              subtitle
              description
              keywords
            }
          }
        }
      `}
    />
  );
};

export default TemplateWrapper;
