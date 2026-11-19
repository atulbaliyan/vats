import React, { useRef, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import clsx from 'clsx';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidthClassName?: string;
  showCloseButton?: boolean;
}

/**
 * Centered accessible modal dialog with automatic focus trapping,
 * focus restoration, ESC key dismissal, and backdrop scroll locking.
 */
export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidthClassName = 'max-w-3xl',
  showCloseButton = true,
}) => {
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    }
  }, [isOpen]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Backdrop overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Modal viewport container */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <DialogPrimitive.Content
            className={clsx(
              'relative w-full bg-vats-surface border border-vats-border rounded-sm shadow-2xl z-10 overflow-hidden outline-none',
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              maxWidthClassName
            )}
            aria-describedby={description ? undefined : undefined}
            onCloseAutoFocus={(e) => {
              if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
                e.preventDefault();
                lastActiveElementRef.current.focus();
              }
            }}
          >
            {/* Accessible screen-reader title */}
            <DialogPrimitive.Title className="sr-only">
              {title}
            </DialogPrimitive.Title>

            {description && (
              <DialogPrimitive.Description className="sr-only">
                {description}
              </DialogPrimitive.Description>
            )}

            {showCloseButton && (
              <DialogPrimitive.Close
                className="absolute top-4 right-4 z-20 p-2 text-vats-muted hover:text-white bg-vats-black/60 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-vats-lime focus-visible:outline-none"
                aria-label={`Close ${title}`}
              >
                <X className="w-5 h-5" />
              </DialogPrimitive.Close>
            )}

            {children}
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export interface AccessibleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  side?: 'left' | 'right';
  children: React.ReactNode;
  widthClassName?: string;
}

/**
 * Slide-out accessible drawer dialog with automatic focus trapping,
 * focus restoration, ESC key dismissal, and backdrop scroll locking.
 */
export const AccessibleDrawer: React.FC<AccessibleDrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  side = 'right',
  children,
  widthClassName = 'max-w-md',
}) => {
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    }
  }, [isOpen]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Backdrop overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Drawer container */}
        <div
          className={clsx(
            'fixed inset-y-0 z-50 flex',
            side === 'right' ? 'right-0 justify-end' : 'left-0 justify-start'
          )}
        >
          <DialogPrimitive.Content
            className={clsx(
              'relative w-full bg-vats-surface h-full flex flex-col z-10 shadow-2xl outline-none',
              side === 'right' ? 'border-l border-vats-border' : 'border-r border-vats-border',
              'data-[state=open]:animate-in data-[state=closed]:animate-out duration-300',
              side === 'right'
                ? 'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
                : 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
              widthClassName
            )}
            onCloseAutoFocus={(e) => {
              if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
                e.preventDefault();
                lastActiveElementRef.current.focus();
              }
            }}
          >
            <DialogPrimitive.Title className="sr-only">
              {title}
            </DialogPrimitive.Title>

            {description && (
              <DialogPrimitive.Description className="sr-only">
                {description}
              </DialogPrimitive.Description>
            )}

            {children}
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
