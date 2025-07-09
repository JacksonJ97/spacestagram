import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "components/common/Dialog";
import LinkButton from "components/common/LinkButton";

export default function LikeAuthDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="mt-3 text-center">Like this post</DialogTitle>
        <DialogDescription className="mt-2 text-center">
          Show your support for this post.
        </DialogDescription>

        <div className="mt-8 flex flex-col items-center gap-3">
          <LinkButton to="/signup" variant="solid" className="h-10 w-full">
            Sign Up
          </LinkButton>
          <LinkButton to="/login" variant="text">
            Log In
          </LinkButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
