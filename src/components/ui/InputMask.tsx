'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from './input';
import IMask, { FactoryArg } from 'imask';

interface InputMaskProps extends React.ComponentProps<'input'> {
	maskOptions?: FactoryArg;
}

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
	({ className, type, maskOptions, ...props }, ref) => {
		const rootRef = React.useRef<HTMLInputElement>(null);
		React.useImperativeHandle(ref, () => rootRef.current!, []);

		React.useEffect(() => {
			IMask(rootRef.current!, maskOptions);
		}, [maskOptions]);

		return (
			<Input
				type={type}
				className={cn(
					'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					className,
				)}
				ref={rootRef}
				{...props}
			/>
		);
	},
);
InputMask.displayName = 'InputMask';

export { InputMask };
