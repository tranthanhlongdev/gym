const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const paths = {
  activity:'M3 12h4l3-8 4 16 3-8h4',
  grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  calendar:'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM16 3v4M8 3v4M3 11h18M8 15h2M14 15h2',
  book:'M12 6c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1ZM12 6v15',
  chart:'M4 3v17h17M8 15l4-5 4 2 5-7',
  ruler:'M9 3 3 9l12 12 6-6L9 3ZM6 6l3 3M9 12l3-3M12 6l3 3M15 12l3 3',
  weight:'M4 7h16l2 14H2L4 7ZM8 7V5a4 4 0 0 1 8 0v2M10 13h4',
  target:'M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 12l9-9M16 3h5v5',
  shield:'m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3ZM8 12l3 3 5-6',
  download:'M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5',
  arrow:'M4 12h16m-6-6 6 6-6 6',
  clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2',
  dumbbell:'m6 4-2 2 14 14 2-2L6 4ZM3 7l4-4M1 9l8-8M15 23l8-8M17 21l4-4',
  machine:'M5 21V3h14v18M3 21h6m6 0h6M5 6h14M12 6v7m-4 0h8M8 17h8',
  leaf:'M20 3C8 2 2 8 5 16c3 7 17 3 15-13ZM4 21 16 9',
  check:'m5 12 4 4L19 6',
  circle:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
  info:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v6M12 7v1',
  close:'m6 6 12 12M6 18 18 6',
  expand:'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5',
  play:'m8 4 12 8-12 8V4Z',
  heart:'M20 5c-3-3-7-1-8 1-1-2-5-4-8-1-5 5 3 11 8 16 5-5 13-11 8-16Z',
  spark:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
};
function icon(name, cls='') { return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.info}"/></svg>`; }
function hydrateIcons(root=document) { $$('[data-icon]',root).forEach(n=>n.innerHTML=icon(n.dataset.icon)); }
hydrateIcons();

const E = (name,en,art,cue,steps,tip,reps='10–12 lần') => ({name,en,art,cue,steps,tip,reps});
const exercises = {
  dbPress:E('Đẩy ngực tạ đơn','Dumbbell bench press','press','Cổ tay thẳng, lòng bàn tay hơi hướng vào nhau.',[
    'Nằm trên ghế phẳng, hai bàn chân đặt chắc trên sàn. Giữ tạ hai bên ngực, khuỷu tay cách thân khoảng 30–45°.',
    'Thở ra, đẩy tạ lên có kiểm soát. Giữ cổ tay thẳng hàng với cẳng tay, không khóa cứng khuỷu.',
    'Hít vào, hạ tạ chậm về vị trí đầu trong biên độ thoải mái. Nhờ huấn luyện viên hỗ trợ cách đưa tạ vào và ra khỏi tư thế.'
  ],'Chọn tạ rất nhẹ để học tư thế. Nếu đau cổ tay hoặc vai, dừng và nhờ người hướng dẫn kiểm tra.'),
  incline:E('Đẩy ngực ghế dốc','Incline dumbbell press','incline','Ghế dốc nhẹ 15–30°, không nhún vai.',[
    'Chỉnh ghế dốc nhẹ 15–30°. Đặt chân chắc, lưng tựa ghế, tạ hai bên ngực trên.',
    'Thở ra, đẩy tạ lên. Giữ bả vai ổn định, cổ tay thẳng, lòng bàn tay hơi hướng vào nhau.',
    'Hít vào và hạ chậm, dừng trước khi thấy căng đau ở vai. Dùng mức tạ nhẹ hơn bài ghế phẳng.'
  ],'Không tăng độ dốc để cố nâng nặng. Bỏ bài này nếu vai hoặc cổ tay chưa thoải mái.'),
  pushdown:E('Duỗi tay sau dây cáp','Rope triceps pushdown','pushdown','Khuỷu sát thân, không gập cổ tay.',[
    'Đặt ròng rọc cao, dùng tay cầm dây thừng. Đứng vững, gối hơi chùng và khuỷu sát thân.',
    'Thở ra, duỗi khuỷu để kéo dây xuống. Giữ vai yên và cổ tay trung lập; không dùng cả thân để đè dây.',
    'Hít vào, cho dây đi lên chậm tới khi khuỷu gập thoải mái. Giữ cùi chỏ gần vị trí ban đầu.'
  ],'Đây là bài dây cáp trong cả hai lựa chọn: tay cầm dây cho phép chỉnh góc cổ tay thoải mái hơn.'),
  cableFly:E('Ép ngực dây cáp nhẹ','Standing cable chest fly','fly','Khuỷu hơi cong, ép nhẹ phía trước ngực.',[
    'Chỉnh hai ròng rọc ngang ngực. Đứng một chân trước một chân sau, cầm tay nắm và hơi gập khuỷu.',
    'Thở ra, đưa hai tay về trước ngực theo đường vòng cung. Giữ thân ổn định và cổ tay thẳng.',
    'Hít vào, mở tay có kiểm soát. Dừng khi cánh tay gần ngang thân; không kéo vai ra sau quá sâu.'
  ],'Chỉ dùng tải nhẹ. Nếu giữ tay nắm gây đau cổ tay, bỏ bài và nhờ huấn luyện viên chọn bài khác.'),
  chestMachine:E('Đẩy ngực với máy','Seated chest press','machinePress','Tay cầm ngang giữa ngực, lưng sát đệm.',[
    'Chỉnh ghế để tay cầm ngang giữa ngực. Đặt chân chắc, lưng và đầu tựa đệm. Chọn kiểu tay cầm không gây đau.',
    'Thở ra, đẩy tay cầm về trước. Giữ cổ tay thẳng, vai hạ và không khóa cứng khuỷu.',
    'Hít vào, trả tay cầm chậm. Dừng trong biên độ thoải mái; không để vai bị kéo quá sâu ra sau.'
  ],'Máy vẫn cần chỉnh ghế và kiểm tra tư thế. Hỏi nhân viên phòng gym ở lần đầu dùng.'),
  inclineMachine:E('Đẩy ngực trên với máy','Incline chest press machine','machinePress','Vai giữ thấp, tay cầm đúng tầm ngực trên.',[
    'Chỉnh ghế theo hướng dẫn máy sao cho tay cầm ở tầm ngực trên. Đặt chân chắc và tựa lưng vào đệm.',
    'Thở ra, đẩy theo quỹ đạo máy, cổ tay thẳng và khuỷu không khóa cứng.',
    'Hít vào, hạ chậm. Dùng biên độ không đau và tải nhẹ hơn bài đẩy ngực ngang.'
  ],'Nếu phòng gym không có máy đẩy dốc, lặp bài chest press với tải nhẹ thay vì tự chế góc ngồi.'),
  pecDeck:E('Ép ngực với máy','Pec deck · forearm pads','pecDeck','Ưu tiên máy có đệm tựa cẳng tay.',[
    'Chọn máy ép ngực có đệm cẳng tay nếu có. Chỉnh ghế để khuỷu ở dưới hoặc ngang vai, lưng tựa đệm.',
    'Thở ra, ép hai cánh tay lại trước ngực. Giữ cổ tay thả lỏng, không nhún vai.',
    'Hít vào, mở cánh tay chậm. Dừng trước khi cánh tay vượt quá thân hoặc thấy đau vai.'
  ],'Nếu máy chỉ có tay nắm và gây đau cổ tay, bỏ bài; không cố dùng lực siết để chịu đau.'),
  row:E('Kéo tạ đơn một tay','Supported one-arm dumbbell row','row','Tựa ghế bằng cẳng tay, kéo khuỷu về hông.',[
    'Tựa cẳng tay hoặc một tay lên ghế chắc; chọn cách không gây đau cổ tay chống đỡ. Giữ lưng tự nhiên và thân gần song song sàn.',
    'Tay còn lại cầm tạ, lòng bàn tay hướng vào thân. Thở ra, kéo khuỷu về phía hông, không xoay cả thân.',
    'Hít vào, hạ tạ chậm. Làm đủ số lần rồi đổi bên với cùng mức tải.'
  ],'Nếu tư thế chống đỡ gây khó chịu, đổi sang kéo cáp ngồi hoặc máy có đệm ngực.','10–12 lần / bên'),
  pulldown:E('Kéo xô tay cầm trung lập','Neutral-grip lat pulldown','pulldown','Kéo về trước ngực, không kéo sau gáy.',[
    'Chỉnh đệm chặn đùi. Cầm tay cầm hai lòng bàn tay hướng vào nhau, ngồi cao người và đặt chân chắc.',
    'Thở ra, kéo khuỷu xuống về hai bên thân, đưa tay cầm về phía ngực trên. Không ngả người mạnh.',
    'Hít vào, trả tay lên từ từ. Giữ vai có kiểm soát và không để cổ tay gập ngược.'
  ],'Bài cáp này dùng được ở cả hai phương án. Chọn tay cầm vừa vai, không nhất thiết cầm thật rộng.'),
  seatedRow:E('Kéo cáp ngồi','Seated cable row','seatedRow','Giữ ngực mở, không đung đưa lưng.',[
    'Ngồi vững, gối hơi cong. Chọn tay cầm trung lập, giữ cột sống tự nhiên và ngực mở.',
    'Thở ra, kéo tay cầm về gần bụng, khuỷu đi sát hai bên. Không giật hoặc ngả lưng ra sau.',
    'Hít vào, duỗi tay chậm mà không gù lưng. Giữ cổ tay thẳng trong cả lượt.'
  ],'Giảm tải nếu phải đung đưa thân để kéo. Không dùng đai quấn cổ tay để cố chịu đau.'),
  hammer:E('Cuốn tay trước kiểu búa','Dumbbell hammer curl','curl','Hai lòng bàn tay đối nhau, khuỷu đứng yên.',[
    'Đứng hoặc ngồi vững. Cầm tạ hai bên người, lòng bàn tay hướng vào thân và cổ tay thẳng.',
    'Thở ra, gập khuỷu đưa tạ lên, không nhún vai hoặc vung lưng.',
    'Hít vào, hạ tạ chậm tới khi tay gần duỗi. Dừng nếu cổ tay đau hoặc tê.'
  ],'Dùng tạ nhẹ để giữ khuỷu ổn định. Không cần xoay cổ tay trong lượt tập.'),
  machineRow:E('Kéo lưng máy tựa ngực','Chest-supported machine row','machineRow','Ngực tựa đệm, khuỷu kéo về sau.',[
    'Chỉnh ghế và đệm ngực để cầm tay nắm thoải mái. Giữ bàn chân chắc và lưng tự nhiên.',
    'Thở ra, kéo tay nắm về phía thân, đưa khuỷu về sau. Ngực vẫn tiếp xúc nhẹ với đệm.',
    'Hít vào, trả tay về từ từ, không giật vai ra trước hoặc gập cổ tay.'
  ],'Ưu tiên tay cầm trung lập nếu có. Không rướn cổ để kéo thêm biên độ.'),
  reverseDeck:E('Mở vai sau với máy','Reverse pec deck','reverseDeck','Mở tay vừa phải, không nhún vai.',[
    'Ngồi quay mặt vào đệm máy. Chỉnh tay nắm và ghế để tay hơi dưới ngang vai.',
    'Thở ra, mở cánh tay ra hai bên và hơi ra sau. Giữ khuỷu hơi cong và ngực tựa đệm.',
    'Hít vào, trả tay chậm. Giữ cổ tay thẳng và dừng khi còn kiểm soát vai.'
  ],'Chọn tải rất nhẹ. Nếu vai bị kẹt hoặc đau, bỏ bài và nhờ kiểm tra tư thế.'),
  machineCurl:E('Cuốn tay trước với máy','Biceps curl machine','machineCurl','Cánh tay tựa đệm, cổ tay thẳng.',[
    'Chỉnh ghế để khuỷu gần trục quay của máy, cánh tay đặt trên đệm. Chọn tay nắm thoải mái.',
    'Thở ra, gập khuỷu đưa tay nắm lên mà không nhấc cánh tay khỏi đệm.',
    'Hít vào, hạ từ từ. Không khóa cứng khuỷu, không gập cổ tay về phía trước.'
  ],'Nếu tay nắm cố định khiến cổ tay khó chịu, bỏ bài; không cố ép theo một góc đau.'),
  goblet:E('Squat ôm tạ đơn','Goblet squat to bench','squat','Chạm ghế nhẹ, gối theo hướng mũi chân.',[
    'Đặt ghế chắc phía sau. Đứng rộng bằng vai, ôm tạ nhẹ trước ngực; có thể bỏ tạ để học động tác.',
    'Hít vào, đẩy hông ra sau và gập gối, hạ tới khi chạm ghế nhẹ. Giữ bàn chân bám sàn.',
    'Thở ra, đẩy sàn để đứng dậy. Gối theo hướng mũi chân, không ngồi thả người xuống ghế.'
  ],'Nếu giữ tạ gây đau cổ tay, tập ngồi xuống đứng lên với trọng lượng cơ thể.'),
  rdl:E('Gập hông với tạ đơn','Dumbbell Romanian deadlift','hinge','Đẩy hông ra sau, tạ đi sát chân.',[
    'Đứng chân rộng bằng hông, cầm tạ nhẹ trước đùi, gối hơi chùng. Giữ cột sống tự nhiên.',
    'Hít vào, đẩy hông ra sau và hạ tạ sát chân tới khi cảm thấy căng cơ đùi sau. Không cần chạm sàn.',
    'Thở ra, siết mông để đứng lên. Không ưỡn lưng ở cuối lượt.'
  ],'Học động tác gập hông không tạ trước. Nhờ huấn luyện viên kiểm tra lưng ở buổi đầu.'),
  bridge:E('Nâng hông trên thảm','Bodyweight glute bridge','bridge','Siết mông, không ưỡn lưng dưới.',[
    'Nằm ngửa trên thảm, co gối và đặt chân rộng bằng hông. Để hai tay thoải mái hai bên thân.',
    'Thở ra, siết mông nâng hông tới khi thân và đùi gần tạo đường thẳng. Giữ bụng nhẹ.',
    'Hít vào, hạ hông từ từ. Không đẩy bằng cổ hoặc ưỡn lưng để nâng cao hơn.'
  ],'Tuần đầu chỉ dùng trọng lượng cơ thể. Đây là bài không cần tỳ lực lên cổ tay.','12–15 lần'),
  deadbug:E('Bụng dead bug','Bodyweight dead bug','deadbug','Giữ lưng dưới ổn định, thở đều.',[
    'Nằm ngửa, đưa tay lên và gập hông gối khoảng 90°. Siết bụng nhẹ, không ép lưng đến mức đau.',
    'Thở ra, duỗi chậm một chân và tay đối diện trong biên độ giữ được lưng dưới ổn định.',
    'Trở về, đổi bên và thở đều. Nếu lưng ưỡn lên, rút ngắn tầm duỗi chân.'
  ],'Chất lượng quan trọng hơn số lần. Có thể chỉ chạm gót xuống thảm thay vì duỗi cả chân.','6–8 lần / bên'),
  legPress:E('Đạp chân với máy','Leg press','legPress','Không khóa gối, không cuộn lưng khỏi đệm.',[
    'Nhờ hướng dẫn cơ chế chốt an toàn. Chỉnh ghế, tựa toàn bộ lưng và đặt hai chân rộng bằng vai trên bàn đạp.',
    'Hít vào, gập gối chậm trong biên độ không làm mông và lưng dưới rời đệm.',
    'Thở ra, đẩy bàn đạp lên. Giữ gối hướng theo mũi chân và dừng trước khi gối khóa cứng.'
  ],'Dùng mức tải thấp nhất phù hợp để làm quen. Không hạ quá sâu chỉ để tăng biên độ.'),
  legCurl:E('Cuốn đùi sau với máy','Seated leg curl','legCurl','Hông giữ trên ghế, cuốn chân chậm.',[
    'Chỉnh ghế để khớp gối gần trục máy, đệm dưới đặt phía trên gót, đệm trên giữ đùi vừa vặn.',
    'Thở ra, gập gối kéo đệm xuống và ra sau. Giữ thân và hông yên trên ghế.',
    'Hít vào, trả chân chậm. Không giật tạ hoặc duỗi khóa cứng gối.'
  ],'Không dùng lực tay siết quá chặt tay cầm. Nhờ nhân viên chỉnh máy ở lượt đầu.'),
  hipMachine:E('Mở hông với máy','Hip abduction machine','hipMachine','Ngồi vững, mở gối trong biên độ thoải mái.',[
    'Chỉnh đệm ở ngoài hai đùi và chọn tải nhẹ. Ngồi tựa lưng với bàn chân ở đúng vị trí của máy.',
    'Thở ra, mở hai gối ra ngoài có kiểm soát, giữ thân yên và không bật người.',
    'Hít vào, khép chân chậm, không để chồng tạ va mạnh.'
  ],'Nếu khớp hông đau hoặc có cảm giác kẹt, dừng bài và nhờ kiểm tra thiết lập máy.','12–15 lần'),
  lateral:E('Nâng tạ đơn sang ngang','Dumbbell lateral raise','lateral','Tạ rất nhẹ, nâng dưới hoặc tới ngang vai.',[
    'Đứng vững, cầm tạ rất nhẹ, khuỷu hơi gập. Hai tay hơi chếch ra trước thân.',
    'Thở ra, đưa tay sang hai bên tới độ cao thoải mái, tối đa khoảng ngang vai. Giữ vai thấp.',
    'Hít vào, hạ tay chậm. Không vung người và không cố úp ngón cái xuống.'
  ],'T5 chỉ 1 hiệp nhẹ để dành phục hồi cho T6. Nếu vai còn mỏi, bỏ bài.'),
  facePull:E('Kéo dây cáp về mặt','Light rope face pull','facePull','Kéo nhẹ, khuỷu mở thoải mái, không rướn cổ.',[
    'Chỉnh dây cáp ngang mặt, cầm hai đầu dây, đứng vững và chọn mức tải rất nhẹ.',
    'Thở ra, kéo dây về gần trán, tách hai đầu dây sang hai bên mà không nhún vai.',
    'Hít vào, trả tay chậm. Giữ cổ tay tự nhiên và không kéo khuỷu quá sâu ra sau.'
  ],'Bài học kiểm soát vai, không phải bài để kéo nặng. Nếu góc vai khó chịu, bỏ bài.'),
  lateralMachine:E('Nâng vai ngang với máy','Lateral raise machine','lateralMachine','Đệm tựa cánh tay, không nhún vai.',[
    'Chỉnh ghế theo trục máy, đặt cánh tay trên đệm, ngồi tựa lưng và thả lỏng cổ tay.',
    'Thở ra, nâng đệm bằng cánh tay tới mức thoải mái, không vượt quá ngang vai.',
    'Hít vào, hạ chậm. Giữ vai thấp và không bật người để nâng tạ.'
  ],'T5 chỉ 1 hiệp nhẹ. Nếu không có máy phù hợp, có thể bỏ bài thay vì ép cổ tay theo tay cầm.'),
};
exercises.calf=E('Nhón bắp chân tạ đơn','Standing dumbbell calf raise','calf','Bám nhẹ điểm tựa nếu cần, lên xuống chậm.',[
 'Đứng trên sàn phẳng, chân rộng bằng hông, cầm tạ nhẹ hoặc chỉ dùng trọng lượng cơ thể. Đứng gần điểm tựa chắc để giữ thăng bằng.',
 'Thở ra, nhón gót lên có kiểm soát. Giữ gối mềm, không bật nảy và không nghiêng cổ chân ra ngoài.',
 'Hít vào, hạ gót chậm về sàn. Bắt đầu trên sàn; không cần dùng bục như một số ảnh mẫu.'
],'Ảnh có thể dùng bục. Tuần đầu tập trên sàn để dễ kiểm soát; nếu cầm tạ gây khó chịu, bỏ tạ.','12–15 lần');
exercises.calfMachine=E('Nhón bắp chân với máy','Standing calf raise machine','calf','Chỉnh đệm vai, giữ gối mềm và không bật nảy.',[
 'Nhờ hướng dẫn khóa an toàn. Chỉnh đệm vai phù hợp, đặt chân chắc trên bàn đạp và chọn tải nhẹ.',
 'Thở ra, nâng gót từ từ, không khóa cứng gối hoặc đẩy bằng lưng.',
 'Hít vào, hạ gót có kiểm soát trong biên độ thoải mái. Không thả gót rơi hoặc kéo căng đau.'
],'Nếu đệm vai hoặc máy không phù hợp, tập nhón gót với trọng lượng cơ thể trên sàn.','12–15 lần');
exercises.lateral.tip='Dùng tải nhẹ để nâng chậm, không nhún vai hoặc vung thân. Không tăng tải nếu biên độ và kiểm soát giảm.';
exercises.lateralMachine.tip='Chỉnh ghế và đệm đúng tầm vai; nếu không có máy phù hợp, dùng tạ đơn nhẹ thay thế.';
const days=GymPlan.days;

// Each exercise has its own reviewed photo sequence. Keep source frame order explicit.
const photoOrder = {dbPress:[1,0],incline:[1,0],pecDeck:[1,0],pulldown:[1,0],legPress:[1,0]};
const photoCaptions = {
 dbPress:['Hạ tạ hai bên ngực','Đẩy tạ lên có kiểm soát'],incline:['Tạ ở hai bên ngực trên','Đẩy lên, giữ vai ổn định'],
 pushdown:['Khuỷu gập, sát thân','Duỗi khuỷu, kéo dây xuống'],cableFly:['Mở tay, khuỷu hơi cong','Khép tay trước ngực'],
 chestMachine:['Khuỷu gập, lưng tựa đệm','Đẩy tay cầm ra trước'],inclineMachine:['Tay cầm ngang ngực trên','Đẩy lên theo quỹ đạo máy'],
 pecDeck:['Mở tay trong biên độ dễ chịu','Ép hai tay về trước ngực'],row:['Tay cầm tạ duỗi xuống','Kéo khuỷu về hông'],
 pulldown:['Tay đưa lên có kiểm soát','Kéo về phía ngực trên'],seatedRow:['Tay duỗi, ngực mở','Kéo tay cầm về bụng'],
 hammer:['Tạ hai bên thân','Gập khuỷu, không xoay cổ tay'],machineRow:['Tay duỗi, ngực tựa đệm','Kéo tay nắm về thân'],
 reverseDeck:['Tay ở phía trước thân','Mở cánh tay sang hai bên'],machineCurl:['Cánh tay đặt trên đệm','Gập khuỷu đưa tay nắm lên'],
 goblet:['Đứng vững, tạ trước ngực','Hạ hông trong biên độ phù hợp'],rdl:['Đứng, gối hơi chùng','Đẩy hông ra sau, tạ sát chân'],
 bridge:['Hông đặt xuống thảm','Siết mông nâng hông lên'],deadbug:['Hông gối gập, tay đưa lên','Duỗi tay và chân đối diện'],
 legPress:['Gối gập, lưng sát đệm','Đạp lên, không khóa cứng gối'],legCurl:['Chân ở phía trước','Gập gối kéo đệm xuống'],
 hipMachine:['Hai chân ở gần nhau','Mở hai gối ra ngoài'],lateral:['Tạ hai bên thân','Nâng tay tối đa ngang vai'],
 facePull:['Tay duỗi về phía dây cáp','Kéo dây về gần trán'],lateralMachine:['Cánh tay đặt trên đệm','Nâng cánh tay tới ngang vai']
};
photoCaptions.calf=['Gót đặt xuống, người đứng vững','Nhón gót lên chậm'];
photoCaptions.calfMachine=['Gót ở vị trí thấp thoải mái','Nâng gót bằng bắp chân'];
const photoNotes = {
 goblet:'Ảnh minh hoạ squat tự do. Tuần đầu có thể đặt ghế chắc phía sau để chạm nhẹ, hoặc bỏ tạ khi học tư thế.',
 rdl:'Ảnh minh hoạ động tác gập hông với tạ đơn. Trong bài của bạn, giữ gối hơi chùng và chỉ hạ tới khi giữ được lưng tự nhiên.',
 pecDeck:'Ảnh dùng máy có tay nắm. Nếu phòng gym có máy đệm cẳng tay, bạn có thể ưu tiên kiểu đó khi cổ tay thoải mái hơn.',
 row:'Ảnh dùng bàn tay tựa ghế. Nếu chống tay gây khó chịu, tựa bằng cẳng tay hoặc đổi sang máy có đệm ngực.',
 lateralMachine:'Máy trong ảnh dùng đĩa tạ. Máy chồng tạ có thể khác thiết kế; cần chỉnh ghế và đệm theo máy thực tế.'
};
function photoPath(id,step){const order=photoOrder[id]||[0,1];return `assets/exercises/${id}-${order[step]}.jpg`;}
function photoPair(id){
 const e=exercises[id];
 if(id==='lateralMachine')return `<span class="photo-composite"><img src="assets/exercises/lateralMachine-pair.webp" alt="Hai tư thế nâng vai ngang với máy: hạ cánh tay và nâng tới ngang vai" width="778" height="467" loading="lazy"><span class="composite-labels"><span>1. Chuẩn bị</span><span>2. Thực hiện</span></span></span>`;
 return `<span class="photo-frames">${[0,1].map(step=>`<span class="photo-frame"><img src="${photoPath(id,step)}" alt="${e.name} — ${photoCaptions[id][step]}" width="600" height="400" loading="lazy" decoding="async"><span>${step+1}. ${step===0?'Chuẩn bị':'Thực hiện'}</span></span>`).join('')}</span>`;
}
let photoInterval=null;
function stopPhotos(){if(photoInterval){clearInterval(photoInterval);photoInterval=null;}}
function viewerMarkup(id,large=false){
 const e=exercises[id];
 if(id==='lateralMachine')return `<div class="photo-viewer composite-viewer"><img src="assets/exercises/lateralMachine-pair.webp" alt="Hai tư thế nâng vai ngang với máy" width="778" height="467"><p class="viewer-caption">1. Chuẩn bị → 2. Nâng cánh tay → Hạ chậm trở lại</p></div>${large?'':`<button class="button secondary enlarge-photo" data-enlarge="${id}">${icon('expand')} Phóng lớn ảnh</button>`}`;
 return `<div class="photo-viewer" data-viewer="${id}"><img id="viewer-image" src="${photoPath(id,0)}" alt="${e.name} — ${photoCaptions[id][0]}" width="600" height="400"><p class="viewer-caption" id="viewer-caption">${photoCaptions[id][0]}</p></div><div class="photo-controls" role="group" aria-label="Chọn tư thế minh hoạ"><button class="active" data-photo-step="0" aria-pressed="true">1. Chuẩn bị</button><button data-photo-step="1" aria-pressed="false">2. Thực hiện</button></div><div class="photo-tools"><button class="text-button" id="auto-photos" aria-pressed="false">${icon('play')} Tự chuyển ảnh</button>${large?'':`<button class="text-button" data-enlarge="${id}">${icon('expand')} Phóng lớn</button>`}</div>`;
}
function bindViewer(id){
 let activeStep=0;
 function setStep(step){activeStep=step;const image=$('#viewer-image');if(!image)return;image.src=photoPath(id,step);image.alt=`${exercises[id].name} — ${photoCaptions[id][step]}`;$('#viewer-caption').textContent=photoCaptions[id][step];$$('[data-photo-step]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.photoStep)===step);b.setAttribute('aria-pressed',String(Number(b.dataset.photoStep)===step));});}
 $$('[data-photo-step]').forEach(b=>b.onclick=()=>setStep(Number(b.dataset.photoStep)));
 const auto=$('#auto-photos');if(auto)auto.onclick=()=>{if(photoInterval){stopPhotos();auto.innerHTML=icon('play')+' Tự chuyển ảnh';auto.setAttribute('aria-pressed','false');}else{photoInterval=setInterval(()=>setStep(activeStep===0?1:0),1600);auto.textContent='Tạm dừng chuyển ảnh';auto.setAttribute('aria-pressed','true');}};
 $$('[data-enlarge]').forEach(b=>b.onclick=()=>showLargePhoto(id));
}
function showLargePhoto(id){modal(exercises[id].name,'Ảnh lớn · Có thể xoay ngang điện thoại để xem rõ hơn',`${viewerMarkup(id,true)}<button class="button secondary back-to-guide" id="back-to-guide">← Quay lại hướng dẫn</button>`);dialog.classList.add('photo-dialog');bindViewer(id);$('#back-to-guide').onclick=()=>showExercise(id);}

