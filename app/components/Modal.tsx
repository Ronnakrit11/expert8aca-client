import React, { FC, ReactNode } from 'react';
import { Modal as FlowbiteModal } from 'flowbite-react';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  subTitle?: string;
  children: ReactNode;
}

const Modal: FC<Props> = ({ open, setOpen, title, subTitle, children }) => {
  return (
    <FlowbiteModal
      show={open}
      onClose={() => setOpen(false)}
      size="md"
    >
      <FlowbiteModal.Header>
        <div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          {subTitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subTitle}
            </p>
          )}
        </div>
      </FlowbiteModal.Header>
      <FlowbiteModal.Body>
        {children}
      </FlowbiteModal.Body>
    </FlowbiteModal>
  );
};

export { Modal };
