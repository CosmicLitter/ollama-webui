<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	type $$Props = SVGAttributes<SVGElement>;
</script>

<svg width="24" height="24" viewBox="0 0 24 24" {...$$restProps} xmlns="http://www.w3.org/2000/svg"
	><style>
		.spinner_8XMC {
			animation: spinner_0zVw 2s infinite;
		}
		.spinner_WWWR {
			animation: spinner_Aojx 2s infinite;
		}
		.spinner_LvYV {
			transform-origin: center;
			animation: spinner_xygp 0.75s linear infinite;
		}
		@keyframes spinner_0zVw {
			0% {
				animation-timing-function: cubic-bezier(0.36, 0.62, 0.43, 0.99);
				cx: 5px;
			}
			50% {
				animation-timing-function: cubic-bezier(0.79, 0, 0.58, 0.57);
				cx: 8px;
			}
		}
		@keyframes spinner_Aojx {
			0% {
				animation-timing-function: cubic-bezier(0.36, 0.62, 0.43, 0.99);
				cx: 19px;
			}
			50% {
				animation-timing-function: cubic-bezier(0.79, 0, 0.58, 0.57);
				cx: 16px;
			}
		}
		@keyframes spinner_xygp {
			100% {
				transform: rotate(360deg);
			}
		}
	</style><defs
		><filter id="spinner-gF01"
			><feGaussianBlur in="SourceGraphic" stdDeviation="1" result="y" /><feColorMatrix
				in="y"
				mode="matrix"
				values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
				result="z"
			/><feBlend in="SourceGraphic" in2="z" /></filter
		></defs
	><g class="spinner_LvYV" filter="url(#spinner-gF01)"
		><circle class="spinner_8XMC" cx="5" cy="12" r="4" /><circle
			class="spinner_WWWR"
			cx="19"
			cy="12"
			r="4"
		/></g
	></svg
>
