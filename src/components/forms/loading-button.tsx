import { LoaderCircle } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { PropsWithChildren } from "react";

interface Props extends ButtonProps, PropsWithChildren {
    isLoading: boolean;
    loadingText?: string;
}

export default function LoadingButton({ children, isLoading, loadingText, ...props }: Props) {
    return (
        <Button {...props} disabled={isLoading || props.disabled}>
            {
                isLoading ?
                    <>
                        <LoaderCircle className="animate-spin" />
                        <span className="break-words max-w-full">{loadingText}</span>
                    </> :
                    <>{children}</>
            }
        </Button>
    )
}