import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Card, CardHeader, CardBody, CardFooter } from "../ui/Card";

type CollapsiblePanelProps = {
  title: string;
  subtitle?: string;

  // Any extra controls you want on the right side of the header (optional)
  right?: ReactNode;

  // Optional standard footer area (subtotals, actions, etc.)
  footer?: ReactNode;

  // Controlled collapse state
  expanded: boolean;
  onExpandedChange: (v: boolean) => void;

  children: ReactNode;

  // Optional text overrides
  collapseLabel?: string;
  expandLabel?: string;

  // NEW: style hooks
  headerClassName?: string;
  bodyClassName?: string;
};

export function CollapsiblePanel({
  title,
  subtitle,
  right,
  footer,
  expanded,
  onExpandedChange,
  children,
  collapseLabel = "Collapse",
  expandLabel = "Expand",
  headerClassName = "",
  bodyClassName = "",
}: CollapsiblePanelProps) {
  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={subtitle}
        isCollapsed={!expanded}
        className={headerClassName}
        right={
          <div className="flex items-center gap-2">
            <Button
              variant="tableHeader"
              onClick={() => onExpandedChange(!expanded)}
              className="flex gap-1 collapsible-button"
            >
              {expanded ? collapseLabel : expandLabel}
            </Button>
            {right}
          </div>
        }
      />

      {expanded ? <CardBody className={bodyClassName}>{children}</CardBody> : null}

      {footer ? <CardFooter className="panel-footer">{footer}</CardFooter> : null}
    </Card>
  );
}
