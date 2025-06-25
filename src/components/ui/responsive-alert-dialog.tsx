import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./alert-dialog";
import LoadingButton from "../forms/loading-button";
import { ButtonProps } from "./button";

export function ResponsiveAlertDialog({
    isOpen,
    setIsOpen,
    title,
    description,
    className,
    action,
    actionLabel = "Sure",
    isLoading = false,
    loadingText = "Deleting...",
    loadingButtonProps
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    description?: string;
    className?: string;
    action: () => void;
    actionLabel?: string;
    isLoading?: boolean;
    loadingText?: string;
    loadingButtonProps?: ButtonProps
}) {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className={className}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {
                        description && (
                            <AlertDialogDescription>{description}</AlertDialogDescription>
                        )
                    }
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton
                        isLoading={isLoading}
                        loadingText={loadingText}
                        type="button"
                        variant={"destructive"}
                        onClick={action}
                        {...loadingButtonProps}
                    >
                        {actionLabel}
                    </LoadingButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
