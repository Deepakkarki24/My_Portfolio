function CodeDotRow() {
  return (
    <div className="code-dot-row">
      <div className="code-dot dot-r" />
      <div className="code-dot dot-y" />
      <div className="code-dot dot-g" />
    </div>
  );
}

export function HeroCodeFloatPrimary() {
  return (
    <div className="hero-code-float">
      <CodeDotRow />
      <div>
        <span className="code-kw">import</span>{' '}
        <span className="code-var">React</span>{' '}
        <span className="code-kw">from</span>{' '}
        <span className="code-str">'react'</span>
      </div>
      <div>
        <span className="code-kw">import</span> {'{'}
        <span className="code-var">useState</span> {'}'}{' '}
        <span className="code-kw">from</span>{' '}
        <span className="code-str">'react'</span>
      </div>
      <br />
      <div>
        <span className="code-kw">const</span>{' '}
        <span className="code-fn">Hero</span> = () =&gt; {'{'}
      </div>
      <div>
        &nbsp;&nbsp;<span className="code-kw">const</span> [
        <span className="code-var">active</span>,{' '}
        <span className="code-fn">setActive</span>]
      </div>
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;=
        <span className="code-fn">useState</span>(
        <span className="code-kw">true</span>)
      </div>
      <br />
      <div>
        &nbsp;&nbsp;<span className="code-kw">return</span> (
      </div>
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="code-fn">Section</span>{' '}
        <span className="code-var">active</span> /&gt;
      </div>
      <div>&nbsp;&nbsp;)</div>
      <div>{'}'}</div>
      <br />
      <div className="code-cm">// ✓ Build complete</div>
    </div>
  );
}

export function HeroCodeFloatSecondary() {
  return (
    <div className="hero-code-float hero-code-float2">
      <CodeDotRow />
      <div className="code-cm"># n8n workflow</div>
      <div>
        <span className="code-fn">trigger</span>:
        <span className="code-str">HTTP</span>
      </div>
      <div>
        <span className="code-fn">model</span>:
        <span className="code-str">gpt-4o</span>
      </div>
      <div>
        <span className="code-fn">db</span>:
        <span className="code-str">MongoDB</span>
      </div>
      <br />
      <div className="code-cm">→ Automation active ✓</div>
    </div>
  );
}
