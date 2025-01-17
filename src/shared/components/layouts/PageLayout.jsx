import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PropTypes from 'prop-types';
import { Paper, Skeleton, Stack, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import { globalGap, globalPadding } from '../../../utils';

export const PageLayout = ({
  title,
  breadcrumbs,
  children,
  actionSection,
  titleAndBreadcrumbsLoading = false,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Stack>
      <Stack
        px={globalPadding}
        py={3}
        component={Paper}
        elevation={0}
        flexDirection="row"
        flexWrap="wrap"
        gap={globalGap}
        justifyContent="space-between"
        alignItems="center"
        zIndex={theme.zIndex.appBar + 1}
        position="sticky"
        top="64px"
        borderRadius={0}
      >
        <Stack sx={{ position: 'sticky', top: 0 }}>
          {titleAndBreadcrumbsLoading ? (
            <Stack>
              <Skeleton
                width={200}
                height={24}
                variant="rounded"
                animation="pulse"
              />
              <Skeleton width={300} height={30} />
            </Stack>
          ) : (
            <React.Fragment>
              {typeof title === 'string' ? (
                <Typography component="h1" variant="h5" fontWeight="bold">
                  {title}
                </Typography>
              ) : (
                title
              )}
              {breadcrumbs && (
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs.map((breadcrumb) => {
                    return breadcrumb.href ? (
                      <Link
                        key={breadcrumb.title}
                        to={breadcrumb.href}
                        style={{
                          textDecoration: 'none',
                          fontSize: 'small',
                          color: theme.palette.info.main,
                        }}
                      >
                        {breadcrumb.title}
                      </Link>
                    ) : (
                      <Typography key={breadcrumb.title} fontSize="small">
                        {breadcrumb.title}
                      </Typography>
                    );
                  })}
                </Breadcrumbs>
              )}
            </React.Fragment>
          )}
        </Stack>
        {actionSection && <Stack sx={{ ml: 'auto' }}>{actionSection}</Stack>}
      </Stack>
      <Stack sx={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        <Stack p={globalPadding} {...props}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};

PageLayout.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ),
  children: PropTypes.node.isRequired,
  actionSection: PropTypes.node,
  titleAndBreadcrumbsLoading: PropTypes.bool,
};
