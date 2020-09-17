import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import Button from "../components/Button"
import Breadcrumbs from "../components/Breadcrumbs"
import Card from "../components/Card"
import Contributors from "../components/Contributors"
import Eth2Articles from "../components/Eth2Articles"
import Eth2Clients from "../components/Eth2Clients"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import RandomAppList from "../components/RandomAppList"
import Roadmap from "../components/Roadmap"
import TableOfContents from "../components/TableOfContents"
import Translation from "../components/Translation"
import TranslationsInProgress from "../components/TranslationsInProgress"
import Warning from "../components/Warning"
import SectionNav from "../components/SectionNav"
import { Mixins } from "../components/Theme"
import { Divider } from "../components/SharedStyledComponents"
import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft } from "../utils/translations"

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 4rem auto 0;
  padding: 2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 6rem;
  }
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  max-width: ${(props) => props.theme.breakpoints.m};

  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .citation {
    p {
      color: ${(props) => props.theme.colors.text200};
    }
  }
`

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text200};
`

const P = styled.p`
  font-size: 1rem;
  margin: 2rem 0 1rem;
  color: ${(props) => props.theme.colors.text300};
`

const H1 = styled.h1`
  ${Mixins.textLevel1}

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 2.5rem;
  }

  /* Prevent nav overlap */
    &:before {
    content: "";
    display: block;
    height: 140px;
    margin-top: -140px;
    visibility: hidden;
  }

  /* Hide anchor link */
  a {
    display: none;
  }
`

const H2 = styled.h2`
  ${Mixins.textLevel2}

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const H3 = styled.h3`
  ${Mixins.textLevel3}

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }

  /* Anchor tag styles */
  a {
    position: relative;
    display: none;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const H4 = styled.h4`
  ${Mixins.textLevel4}
`

const H5 = styled.h5`
  ${Mixins.textLevel5}
`

const Pre = styled.pre`
  max-width: 100%;
  overflow-x: scroll;
  background-color: ${(props) => props.theme.colors.preBackground};
  border-radius: 0.25rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.preBorder};
  white-space: pre-wrap;
`

// Passing components to MDXProvider allows
// component use across all .md/.mdx files
const components = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  pre: Pre,
  a: Link,
  table: MarkdownTable,
  MeetupList,
  RandomAppList,
  Roadmap,
  Logo,
  Button,
  Contributors,
  InfoBanner,
  Warning,
  Eth2Articles,
  Eth2Clients,
  Card,
  Divider,
  SectionNav,
  Pill,
  Twemoji,
  TranslationsInProgress,
}

const StaticPage = ({ data: { mdx } }) => {
  const intl = useIntl()
  const isRightToLeft = isLangRightToLeft(intl.locale)
  const tocItems = mdx.tableOfContents.items

  // TODO some `gitLogLatestDate` are `null` - why?
  const lastUpdatedDate = mdx.parent.fields
    ? mdx.parent.fields.gitLogLatestDate
    : mdx.parent.mtime

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      <PageMetadata
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />
      <ContentContainer>
        <Breadcrumbs slug={mdx.fields.slug} />
        <LastUpdated>
          <Translation id="page-last-updated" />:{" "}
          {getLocaleTimestamp(intl.locale, lastUpdatedDate)}
        </LastUpdated>
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </ContentContainer>
      {mdx.frontmatter.sidebar && tocItems && (
        <TableOfContents
          items={tocItems}
          maxDepth={mdx.frontmatter.sidebarDepth}
        />
      )}
    </Page>
  )
}

export const staticPageQuery = graphql`
  query StaticPageQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        sidebar
        sidebarDepth
      }
      body
      tableOfContents
      parent {
        ... on File {
          mtime
          fields {
            gitLogLatestDate
          }
        }
      }
    }
  }
`

export default StaticPage
