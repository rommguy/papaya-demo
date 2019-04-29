import React, { ChangeEvent, Component, createRef, FunctionComponent } from 'react'
import './App.scss'
import { ContentParagraph } from './ContentParagraph'

interface RenderLoggerProps {
  name: string
}

const RenderLogger: FunctionComponent<RenderLoggerProps> = props => {
  console.log(`${props.name} rendered`)
  return <>{props.children}</>
}

export interface StyleState {
  fontSize: number
  color: string
}

interface MeasuredLayout {
  width: number
  height: number
  top: number
  left: number
}

type AppParts = 'title' | 'subTitle' | 'content'

interface AppState {
  styles: {
    title: StyleState
    subTitle: StyleState
    content: StyleState
  }
  selectedType: AppParts | null
  highlightLayout: MeasuredLayout
}

export class App extends Component<{}, AppState> {
  static displayName = 'App'

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any): void {
    if (this.state.styles !== prevState.styles || this.state.selectedType !== prevState.selectedType) {
      const highlightLayout = this.measureSelectedPart()
      this.setState({
        highlightLayout
      })
    }
  }

  titleRef = createRef<HTMLHeadingElement>()
  subTitleRef = createRef<HTMLHeadingElement>()
  contentRef = createRef<HTMLDivElement>()
  previewRef = createRef<HTMLDivElement>()

  state: AppState = {
    styles: {
      title: { fontSize: 32, color: 'black' },
      subTitle: { fontSize: 24, color: 'black' },
      content: { fontSize: 18, color: 'black' }
    },
    selectedType: null,
    highlightLayout: { width: 0, height: 0, top: 0, left: 0 }
  }

  getSelectedPartElement = () => {
    switch (this.state.selectedType) {
      case 'title':
        return this.titleRef.current
      case 'subTitle':
        return this.subTitleRef.current
      case 'content':
        return this.contentRef.current
    }
  }

  measureSelectedPart = (): MeasuredLayout => {
    const element: HTMLElement = this.getSelectedPartElement() as HTMLElement
    const preview = this.previewRef.current!
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
      top: element.offsetTop + preview.offsetTop,
      left: element.offsetLeft + preview.offsetLeft
    }
  }

  setSelectedPart = (part: AppParts) => {
    this.setState({
      selectedType: part
    })
  }

  setFontSize = (e: ChangeEvent<HTMLInputElement>) => {
    if (!this.state.selectedType) {
      return
    }
    const value = e.target.value

    const currentStyle = this.state.styles[this.state.selectedType!]
    const resultStyle: StyleState = { color: currentStyle.color, fontSize: +value }
    const updatedStyles = { ...this.state.styles, [this.state.selectedType]: resultStyle }
    this.setState({
      styles: updatedStyles
    })
  }

  setColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (!this.state.selectedType) {
      return
    }
    const value = e.target.value

    const currentStyle = this.state.styles[this.state.selectedType!]
    const resultStyle: StyleState = { color: value, fontSize: currentStyle.fontSize }
    const updatedStyles = { ...this.state.styles, [this.state.selectedType]: resultStyle }
    this.setState({
      styles: updatedStyles
    })
  }

  render() {
    const selectedStyle = this.state.selectedType && this.state.styles[this.state.selectedType]
    return (
      <div className="App">
        <div className="controls">
          <div className="part-name">
            <span>Selected: {this.state.selectedType || ''}</span>
          </div>
          {selectedStyle && (
            <>
              <div className="font-size-control">
                <span>Font Size: </span>
                <input value={selectedStyle.fontSize} type="number" onChange={this.setFontSize} />
              </div>
              <div className="color-control">
                <span>Color: </span>
                <input value={selectedStyle.color} onChange={this.setColor} />
              </div>
            </>
          )}
        </div>
        <div className="preview" ref={this.previewRef}>
          <RenderLogger name="Title">
            <h3
              id="title"
              style={this.state.styles.title}
              onClick={() => this.setSelectedPart('title')}
              ref={this.titleRef}
            >
              My Post
            </h3>
          </RenderLogger>
          <h5
            id="subTitle"
            style={this.state.styles.subTitle}
            onClick={() => this.setSelectedPart('subTitle')}
            ref={this.subTitleRef}
          >
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
          </h5>
          <RenderLogger name="content">
            <ContentParagraph
              contentStyle={this.state.styles.content}
              onContentClicked={() => this.setSelectedPart('content')}
              ref={this.contentRef}
            />
          </RenderLogger>
        </div>
        {this.state.selectedType && <div className="highlight-frame" style={this.state.highlightLayout} />}
      </div>
    )
  }
}

/**
 * Communication with ContentParagraph component - onClick, ref
 * Parent and Owner - RenderLogger - no own DOM, see in React dev tools
 * didUpdate setState risk (replace condition with this.state !== prevState)
 * Optimize setSelectedPart to render only if state changed
 */
