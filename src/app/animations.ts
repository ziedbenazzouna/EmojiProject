import { trigger, state, query, style, animate, transition, stagger, keyframes } from '@angular/animations'

export const fadeInOut = trigger('fadeInOut', [
  transition('void=>*', [
    style({ opacity: 0}),
    animate("0.5s ease-in")
  ]),
  transition('*=>void', [
    style({ opacity: 1, transform:'translateY(80%)' }),
    animate("1s ease-out")
  ])
])
export const fadeInIndex1 = trigger('fadeInIndex1', [
  transition('void=>*', [
    style({ opacity: 0, height:0 }),
    animate("1s 1s ease-in")
  ])
])
export const fadeInIndex2 = trigger('fadeInIndex2', [
  transition('void=>*', [
    style({ opacity: 0, height:0 }),
    animate("1s 2.5s ease-in")
  ])
])
export const fadeInIndex3 = trigger('fadeInIndex3', [
  transition('void=>*', [
    style({ opacity: 0, height:0 }),
    animate("1s 4s ease-in")
  ])
])
export const fadeInIndex4 = trigger('fadeInIndex4', [
  transition('void=>*', [
    style({ opacity: 0}),
    animate("1s 6.5s ease-in")
  ])
])
export const fadeInButton= trigger('fadeInButton', [
  transition('void=>*', [
    style({ opacity: 0, transform:'translateY(80%)'}),
    animate("0.5s 6s ease-out")
  ])
])

// export const fader =
//   trigger('routeAnimations', [
//     transition('* => void', [
//       // Animate the new page in
//       // query(':enter', [
//       //   style({opacity:0}),
//       //   animate('600ms ease', style({ opacity: 1})),
//       // ]),
//       query(':leave', [
//         style({opacity: 1}),
//         animate('600ms 2s ease', style({ opacity: 0}))
//       ])
//     ]),
// ]);
export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ]),
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ])
    ]),
]);

export const fadeAnimation =

    trigger('fadeAnimation', [

        transition( '* => void', [

            // query(':enter', 
            //     [
            //         style({ opacity: 0 })
            //     ], 
            //     { optional: true }
            // ),

            query(':leave', 
                [
                    style({ opacity: 1 }),
                    animate('2s ease', keyframes([ 
                      style({opacity:0.5, offset: 0}),
                      style({top:"-200%", opacity: 0, offset:1})
                    ]))
                ], 
                { optional: true }
            ),

            // query(':enter', 
            //     [
            //         style({ opacity: 0 }),
            //         animate('1s', style({ opacity: 1 }))
            //     ], 
            //     { optional: true }
            // )

        ])

]);

export const fadeInList = trigger('fadeInList', [
  transition('* => *',[
    query(':enter', style({opacity:0}), {optional:true}),
    query(':enter',[
      stagger(25, [ 
      animate('.5s ease-in', style({opacity:1}))
      ])], {optional: true})]
    )
])

export const fade=trigger('fade',[
  transition('void=>*',[
    style({opacity: 0}),
    animate(500)
  ])
])