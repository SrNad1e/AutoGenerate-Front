import { Card } from 'antd';
import React from 'react';

import styles from './style.less';

type Props = {
  content?: string;
  action?: any;
  contentHeight?: number;
  total?: number;
  loading?: boolean;
  footer?: any;
  children?: any;
  avatar?: any;
};

const ChartCard = ({
  action,
  contentHeight,
  footer,
  loading,
  content,
  total,
  children,
  avatar,
}: Props) => {
  const renderTotal = (totalCard: any) => {
    if (!total) {
      return null;
    }

    let totalDom;

    switch (typeof total) {
      case 'undefined':
        totalDom = null;
        break;
      case 'function':
        totalDom = <div className={styles.total}>{totalCard()}</div>;
        break;

      default:
        totalDom = <div className={styles.total}>{totalCard}</div>;
    }

    return totalDom;
  };

  const contentRender = () => (
    <div className={styles.chartCard}>
      <div className={styles.chartTopMargin}>
        <div className={styles.avatar}>{avatar}</div>
        <div className={styles.metaWrap}>
          <div className={styles.meta}>
            <span className={styles.title}>{content}</span>
            <span className={styles.action}>{action}</span>
          </div>
          {renderTotal(total)}
        </div>
      </div>
      {children && (
        <div
          className={styles.content}
          style={{
            height: contentHeight || 'auto',
          }}
        >
          <div className={contentHeight && styles.contentFixed}>{children}</div>
        </div>
      )}
      {footer && (
        <div className={styles.footer} style={{ marginTop: 20 }}>
          {footer}
        </div>
      )}
    </div>
  );
  const props = {
    action,
    contentHeight,
    footer,
    loading,
    content,
    total,
    children,
    avatar,
  };

  return (
    <Card bodyStyle={{ padding: '20px 24px 8px 24px' }} {...props}>
      {contentRender()}
    </Card>
  );
};

export default ChartCard;
