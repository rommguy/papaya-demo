import React, { forwardRef, Ref } from 'react'
import { StyleState } from './App'

interface ContentParagraphProps {
  contentStyle: StyleState
  onContentClicked: () => void
}

export const ContentParagraph = forwardRef((props: ContentParagraphProps, ref: Ref<HTMLDivElement>) => (
  <div id="content" style={props.contentStyle} onClick={props.onContentClicked} ref={ref}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod rutrum massa sit amet convallis. Curabitur sem
      dolor, viverra sit amet tristique eu, accumsan sed nisi. Nulla pellentesque metus in arcu semper, a aliquet eros
      dignissim. Donec ac lacus vel nisi gravida sagittis a a neque. Donec ut tellus vel massa consequat consectetur et
      vel purus. Praesent neque ex, commodo a laoreet et, condimentum in quam. Ut nec convallis magna. Integer ac
      sodales velit. Vestibulum sit amet felis vel nulla placerat facilisis a non ante.
    </p>
    <p>
      Sed nec mi sed mauris vehicula lacinia et in dui. Fusce dictum lectus leo, id mattis nulla porttitor non. Aliquam
      erat volutpat. In eleifend eleifend felis, non iaculis dui fringilla non. Aliquam erat volutpat. Donec in odio
      iaculis, mollis odio eu, mollis ante. Etiam sed pellentesque massa. Aenean ex quam, tempus commodo lobortis
      finibus, mattis a massa. Morbi id imperdiet justo.
    </p>
    <p>
      Ut placerat nisl orci, nec vehicula metus lacinia vitae. Mauris vitae lacus scelerisque, pellentesque libero in,
      finibus sapien. Cras luctus, massa sit amet posuere sagittis, massa sem interdum magna, in porta augue ante sit
      amet erat. Donec aliquet, ex vel imperdiet consectetur, enim urna tincidunt urna, et imperdiet arcu neque a sem.
      Integer accumsan tellus magna, sit amet malesuada ex bibendum in. Ut a mattis nisl, eu interdum nibh. Mauris
      accumsan arcu non pharetra mollis. Pellentesque efficitur magna quam, eget varius nulla aliquet ac. Nulla
      vulputate mauris in sollicitudin scelerisque. Donec dolor est, viverra et orci eu, tempor pharetra est. Donec
      vitae tortor at elit mattis porta non et tellus.
    </p>
    <p>
      Phasellus in tincidunt enim. Fusce a vehicula orci. Sed vitae porta ligula, vel cursus odio. Cras eget ex
      efficitur diam euismod auctor. Nam arcu neque, pretium a aliquam vitae, efficitur vel diam. Suspendisse nec nunc
      ac ante laoreet aliquam. Etiam laoreet sodales nibh, eget finibus risus lacinia at. Nullam ac quam sapien. Duis
      interdum congue pretium. Nulla ut sapien eu diam laoreet tempus sed in diam. Mauris ultrices ex sit amet sem
      egestas varius.
    </p>
  </div>
))
