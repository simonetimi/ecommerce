import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

const ConfirmModal = ({
  action,
  isOpen,
  onOpenChange,
}: {
  action: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?
              </ModalHeader>
              <ModalBody>Action cannot be undone.</ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    action();
                    onClose();
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
