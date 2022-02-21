declare namespace ALERT {
  type AlertInformationProps = {
    visible?: boolean | undefined;
    message?: string | undefined;
    type?: TYPES;
    onCancel?: () => void;
  };
}
