
declare namespace ModalNamespace {
    interface Props {
        visible?: boolean,
        onCancel?: ()=>void,
        title?: string,
        footer?: boolean,
        className?: string
    }
}