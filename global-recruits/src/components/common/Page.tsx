import { useEffect, useState } from "react";

export default function Page(props: any) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return props.children;
}