<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Money OS architecture
- Keep finance models, calculations, and service adapters in `src/lib/money`; monetary amounts use integer minor units to avoid rounding errors.
- Use a shared React provider for the session ledger and a typed API adapter; the isolated, clearly labelled demo adapter never stores financial data in browser storage.
- Render shareable finance screens as individual TanStack leaf routes inside a shared adaptive shell, with reusable finance views and forms.
- Keep native camera, share, secure storage, biometrics, and receipt extraction behind capability interfaces; unavailable integrations must never imply success.
