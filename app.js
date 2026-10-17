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
const days = [
  {short:'Thứ 2',date:19,title:'Ngực & tay sau',tag:'Push',mins:'40–50',cardio:'10–15',cardioName:'Đi bộ trên máy',cardioTip:'Khởi đầu 10 phút, mặt phẳng hoặc dốc thấp. Tốc độ đủ để vẫn nói được câu trọn vẹn.',free:['dbPress','incline','cableFly','pushdown'],machine:['chestMachine','inclineMachine','pecDeck','pushdown']},
  {short:'Thứ 3',date:20,title:'Lưng, xô & tay trước',tag:'Pull',mins:'40–50',cardio:'10–15',cardioName:'Đạp xe tại chỗ',cardioTip:'Kháng lực nhẹ, đạp đều. Giữ vai và bàn tay thư giãn, không dồn trọng lượng lên cổ tay.',free:['pulldown','row','seatedRow','hammer'],machine:['pulldown','machineRow','reverseDeck','machineCurl']},
  {short:'Thứ 4',date:21,title:'Chân, mông & bụng',tag:'Legs & Core',mins:'40–50',cardio:'10–15',cardioName:'Đi bộ nhẹ cuối buổi',cardioTip:'Chân vừa tập xong: đi bộ mặt phẳng nhẹ hoặc đạp xe nhẹ. Giảm thời lượng nếu chân quá mỏi.',free:['goblet','rdl','bridge','deadbug'],machine:['legPress','legCurl','hipMachine','deadbug']},
  {short:'Thứ 5',date:22,title:'Vai & bắp tay',tag:'Shoulders & Arms',mins:'30–40',cardio:'10–20',cardioName:'Đạp xe nhịp thoải mái',cardioTip:'Bắt đầu 10 phút. Chỉ tăng thêm 5 phút nếu dễ chịu, vẫn nói chuyện được và hồi phục tốt.',free:['lateral','facePull','hammer','pushdown'],machine:['lateralMachine','reverseDeck','machineCurl','pushdown'],light:true,note:'Buổi nhẹ: chỉ 1 hiệp mỗi bài, còn dư 4–5 lần. Nếu tay hoặc vai chưa hồi phục, bỏ phần kháng lực và chỉ đi bộ nhẹ.'},
  {short:'Thứ 6',date:23,title:'Lưng, ngực & bụng',tag:'Upper Body & Core',mins:'30–45',cardio:'10–20',cardioName:'Đi bộ khép lại tuần tập',cardioTip:'Tuần đầu ưu tiên 10–20 phút nhẹ. Mốc 20–30 phút là lựa chọn sau này khi thể lực và khả năng hồi phục đã tốt hơn.',free:['dbPress','seatedRow','pulldown','deadbug'],machine:['chestMachine','machineRow','pulldown','deadbug'],light:true,note:'Kiểm tra phục hồi sau T5: nếu vai/tay còn mỏi, nghỉ phần thân trên và chỉ cardio nhẹ. Khi hết mỏi, tập kỹ thuật 1 hiệp/bài, tải nhẹ.'},
  {short:'Thứ 7',date:24,title:'Nghỉ & phục hồi',tag:'Rest day',rest:true},
  {short:'Chủ nhật',date:25,title:'Nghỉ & nạp năng lượng',tag:'Rest day',rest:true}
];

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

const STORAGE='nhip-tap-2026-10-19-v1';
let state={day:0,mode:'free',done:{},notes:''};
try { const saved=JSON.parse(localStorage.getItem(STORAGE)); if(saved && typeof saved==='object') state={...state,...saved,day:Math.max(0,Math.min(6,Number(saved.day)||0)),mode:saved.mode==='machine'?'machine':'free',done:saved.done&&typeof saved.done==='object'?saved.done:{},notes:typeof saved.notes==='string'?saved.notes:''}; } catch {}
let persistWarned=false;
function persist(){try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{if(!persistWarned){toast('Trình duyệt không cho lưu tiến độ. Bạn vẫn có thể tập trong phiên này.');persistWarned=true;}}}
const key=(day,item)=>`${day}-${item}`;
const countDay=d=>Array.from({length:5},(_,i)=>state.done[key(d,i)]?1:0).reduce((a,b)=>a+b,0);
function totalDone(){return days.slice(0,5).reduce((sum,_,i)=>sum+countDay(i),0);}
function sessionComplete(d){return countDay(d)===5;}
function sets(d){return d.light?'1 hiệp':'1–2 hiệp';}
function exerciseModeLabel(){return state.mode==='free'?'Tạ đơn / dây cáp':'Máy / dây cáp';}
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3000);}

function renderDays(){
  const previousScroll=$('#week-days').scrollLeft;
  $('#week-days').innerHTML=days.map((d,i)=>`<button class="day-card ${state.day===i?'selected ':''}${d.rest?'rest-day':''}" data-day="${i}" aria-pressed="${state.day===i}" aria-label="${d.short}, ${d.date} tháng 10, ${d.title}"><div class="day-top"><span>${d.short}</span><span class="day-number">${d.date}</span></div><h3>${d.rest?'Nghỉ ngơi':i===1?'Lưng & tay trước':i===2?'Chân & bụng':i===4?'Thân trên':d.title}</h3><p>${d.tag}</p><div class="day-bottom">${icon(d.rest?'leaf':'clock')} ${d.rest?'Phục hồi':'Buổi tối'}</div>${i<5&&sessionComplete(i)?`<span class="day-done">${icon('check')}</span>`:''}</button>`).join('');
  $('#week-days').scrollLeft=previousScroll;
  $$('[data-day]').forEach(btn=>btn.addEventListener('click',()=>selectDay(Number(btn.dataset.day))));
}
function selectDay(day){state.day=day;persist();render();const selected=$('.day-card.selected');if(selected)selected.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});}
function updateProgress(){
  const done=totalDone();const complete=days.slice(0,5).filter((_,i)=>sessionComplete(i)).length;
  $('#progress-number').textContent=`${Math.round(done/25*100)}%`;
  $('#progress-fill').style.width=`${done/25*100}%`;
  $('#progress-items').textContent=`${done}/25 mục tập`;
  $('#progress-caption').textContent=`${complete}/5 buổi đã hoàn thành · ${complete===5?'Một tuần đều đặn. Bạn đã làm rất tốt!':done>0?'Từng bước nhỏ đang tạo nên thay đổi.':'Mọi hành trình đều bắt đầu từ buổi đầu tiên.'}`;
}
function render(){renderDays();renderWorkout();updateProgress();}
function renderWorkout(){
  const d=days[state.day];
  if(d.rest){$('#workout').innerHTML=`<div class="rest-view"><div><span class="rest-symbol">${icon('leaf')}</span><span class="eyebrow">${d.short.toUpperCase()} · ${d.date}/10 · HỒI PHỤC</span><h2>Cho cơ thể một khoảng nghỉ.</h2><p>Hôm nay nghỉ tập có cấu trúc. Ăn đủ bữa, ngủ đủ và thư giãn. Phục hồi cũng là một phần của hành trình khỏe hơn.</p><div class="rest-tags"><span>Không tập tạ</span><span>Không cardio bắt buộc</span><span>Lắng nghe cơ thể</span></div><button class="button secondary" style="margin-top:25px" id="back-monday">${icon('calendar')} Xem lại lịch Thứ 2</button></div></div>`;$('#back-monday').onclick=()=>selectDay(0);return;}
  const ids=d[state.mode];const done=countDay(state.day);
  $('#workout').innerHTML=`<div class="workout-title-row"><div><span class="workout-eyebrow">BUỔI ${String(state.day+1).padStart(2,'0')} · ${d.short.toUpperCase()}, ${d.date}/10</span><h2>${d.title}</h2><p class="workout-subtitle">${icon('clock')} ${d.mins} phút <span>·</span> ${d.light?'Buổi kỹ thuật nhẹ':'Cường độ nhẹ đến vừa'} <span>·</span> ${d.tag}</p></div><div class="equipment-switch" role="group" aria-label="Chọn dụng cụ tập"><button data-mode="free" class="${state.mode==='free'?'active':''}" aria-pressed="${state.mode==='free'}">${icon('dumbbell')}Tạ đơn / Dây cáp</button><button data-mode="machine" class="${state.mode==='machine'?'active':''}" aria-pressed="${state.mode==='machine'}">${icon('machine')}Tập với máy</button></div></div>
  <div class="workout-grid"><div class="routine-main"><div class="routine-top">${icon('spark')}<div><strong>01. Khởi động · 5–10 phút</strong><p>Đi bộ nhẹ, xoay vai nhẹ, gập duỗi cổ tay không tải. Thử 1 hiệp thật nhẹ trước bài đầu.</p></div></div>
  ${d.note?`<div class="recovery-note">${icon('info')}<p>${d.note}</p></div>`:''}
  <div class="routine-label">02. KHÁNG LỰC <span>4 bài · ${exerciseModeLabel()}</span></div>
  <div class="exercise-grid">${ids.map((id,i)=>{const e=exercises[id];const isDone=!!state.done[key(state.day,i)];return `<article class="exercise-card ${isDone?'completed':''}"><button class="exercise-art photo-art" data-detail="${id}" aria-label="Xem minh hoạ và kỹ thuật ${e.name}">${photoPair(id)}<span class="exercise-index">${String(i+1).padStart(2,'0')}</span><span class="art-badge">${e.art==='deadbug'||e.art==='bridge'?'TRỌNG LƯỢNG CƠ THỂ':state.mode==='machine'?'MÁY / CÁP':'TẠ ĐƠN / CÁP'}</span><span class="photo-open">${icon('expand')} Xem ảnh lớn & kỹ thuật</span></button><div class="exercise-body"><h3>${e.name}</h3><p class="english-name">${e.en}</p><div class="exercise-meta"><strong>${sets(d)} × ${e.reps}</strong><span>·</span>Nghỉ 60–90s</div><p class="exercise-cue">${e.cue}</p><div class="exercise-actions"><button class="text-button" data-detail="${id}">Ảnh & kỹ thuật ${icon('arrow')}</button><button class="complete-button" data-complete="${i}" aria-pressed="${isDone}" aria-label="${isDone?'Bỏ đánh dấu':'Đánh dấu đã tập'} ${e.name}">${icon(isDone?'check':'circle')}${isDone?'Đã tập':'Hoàn thành'}</button></div></div></article>`;}).join('')}</div>
  <div class="cardio-card"><div class="cardio-heading"><span class="cardio-icon">${icon('heart')}</span><div><span class="eyebrow">03. CARDIO CUỐI BUỔI</span><h3>${d.cardioName} · ${d.cardio} phút</h3><p>Thở nhanh hơn một chút, vẫn nói chuyện được.</p><button class="cardio-more" id="cardio-detail">Xem nhịp tập phù hợp →</button></div></div><button class="complete-button" data-complete="4" aria-pressed="${!!state.done[key(state.day,4)]}">${icon(state.done[key(state.day,4)]?'check':'circle')}${state.done[key(state.day,4)]?'Đã cardio':'Đã hoàn thành'}</button></div>
  </div><aside class="training-sidebar"><section class="session-card"><div class="session-card-header"><h3>Buổi tập của bạn</h3>${icon('clock')}</div><p class="session-date">${d.short}, ${d.date} tháng 10 · Buổi tối</p><div class="session-count"><strong>${done}</strong><span>/ 5 mục đã hoàn thành</span></div><div class="session-progress"><span style="width:${done/5*100}%"></span></div><div class="session-lines"><div class="session-line"><span>Kháng lực</span><strong>${d.light?'15–20':'20–25'} phút</strong></div><div class="session-line"><span>Cardio</span><strong>${d.cardio} phút</strong></div><div class="session-line"><span>Mức gắng sức</span><strong>${d.light?'4–5':'5–6'} / 10</strong></div></div><button class="button primary" id="rest-start">${icon('clock')}Bấm giờ nghỉ · 60 giây</button><div id="timer-host"></div><p class="session-footnote">Nghỉ thêm nếu chưa thở đều.</p><label class="notes-label" for="session-note">Ghi chú của tuần</label><textarea class="notes-input" id="session-note" placeholder="Mức tạ, cảm nhận cổ tay, điều cần nhớ…" maxlength="2000"></textarea><p class="session-footnote">Tiến độ và ghi chú lưu trên trình duyệt này.</p></section>
  <section class="wrist-note"><div class="note-heading">${icon('shield')}Chăm sóc cổ tay của bạn</div><p>Giữ cổ tay thẳng hàng cẳng tay, chọn tay cầm thoải mái. Đau nhói, tê hoặc sưng: dừng bài. Nếu kéo dài, nên được chuyên viên y tế đánh giá.</p><button class="text-button" id="wrist-guide">Xem lưu ý khi tập ${icon('arrow')}</button></section>
  <section class="rhythm-note"><h3>Chậm một nhịp, chắc một bước.</h3><ul><li>Tuần đầu bắt đầu 1 hiệp/bài.</li><li>T2–T4 thêm hiệp 2 khi còn khỏe.</li><li>Dừng trước kiệt sức, còn dư 3–4 lần.</li><li>T5–T6 giảm tải, ưu tiên phục hồi.</li></ul></section></aside></div>`;
  $$('[data-mode]').forEach(btn=>btn.onclick=()=>{state.mode=btn.dataset.mode;persist();renderWorkout();});
  $$('[data-detail]').forEach(btn=>btn.onclick=()=>showExercise(btn.dataset.detail));
  $$('[data-complete]').forEach(btn=>btn.onclick=()=>toggleDone(Number(btn.dataset.complete)));
  $('#rest-start').onclick=startRest;
  $('#wrist-guide').onclick=showGuide;
  $('#cardio-detail').onclick=showCardio;
  $('#session-note').value=state.notes;
  $('#session-note').oninput=event=>{state.notes=event.target.value;persist();};
  if(timerEnd || timerPaused!==null)renderTimer();
}
function toggleDone(item){const k=key(state.day,item);state.done[k]=!state.done[k];persist();render();if(sessionComplete(state.day))toast('Đã hoàn thành buổi tập. Hãy dành thời gian hồi phục!');}

const dialog=$('#detail-dialog');
dialog.addEventListener('close',stopPhotos);
function modal(title,subtitle,body){
  stopPhotos();dialog.className='';
  const alreadyOpen=dialog.open;
  $('#dialog-content').innerHTML=`<div class="modal-header"><div><h2 id="modal-title">${title}</h2><p>${subtitle}</p></div><button class="close-button" id="close-dialog" aria-label="Đóng cửa sổ">${icon('close')}</button></div><div class="modal-body">${body}</div>`;
  dialog.setAttribute('aria-labelledby','modal-title');
  $('#close-dialog').onclick=()=>dialog.close();
  if(!alreadyOpen)dialog.showModal();
}
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
function showExercise(id){const e=exercises[id];const d=days[state.day];modal(e.name,e.en,`${viewerMarkup(id)}<div class="modal-stats"><span>${sets(d)} × ${e.reps}</span><span>Nghỉ 60–90 giây</span><span>Tải nhẹ</span></div><h3>Thực hiện từng bước</h3><ol>${e.steps.map(s=>`<li>${s}</li>`).join('')}</ol>${photoNotes[id]?`<div class="photo-variant-note">${photoNotes[id]}</div>`:''}<div class="modal-callout">${icon('shield')} ${e.tip}</div><p class="photo-reference">Ảnh giúp nhận biết động tác và dụng cụ. Tải và biên độ trong ảnh không phải mức tập bạn cần đạt. Nhờ huấn luyện viên kiểm tra kỹ thuật ở buổi đầu.</p><p class="photo-credit">${id==='lateralMachine'?'<a href="https://gymfitclub.ir/articles/showarticle/205" target="_blank" rel="noopener">Nguồn minh hoạ: GymFit</a>':'<a href="https://github.com/yuhonas/free-exercise-db" target="_blank" rel="noopener">Nguồn ảnh: Free Exercise DB</a>'}</p>`);bindViewer(id);}
function showCardio(){const d=days[state.day];modal('Cardio vừa với sức bạn',`${d.short} · ${d.cardioName}`,`<h3>Tuần này: ${d.cardio} phút</h3><p>${d.cardioTip}</p><ol><li>Bắt đầu chậm 2–3 phút để tìm nhịp dễ chịu.</li><li>Giữ mức vẫn nói được câu trọn vẹn. Nếu không nói được vì hụt hơi, giảm tốc hoặc dừng nghỉ.</li><li>Cuối buổi giảm nhịp dần 2–3 phút, thời gian này nằm trong tổng thời lượng.</li></ol><div class="modal-callout">Không cần đạt 30 phút ngay tuần đầu. Khả năng phục hồi và cảm nhận trong buổi tập quyết định mức tăng.</div><h3>Giảm mỡ bụng là quá trình toàn thân</h3><p>Cardio hỗ trợ vận động và thể lực; bài bụng giúp cơ bụng khỏe. Không có bài tập đốt mỡ riêng một vị trí. Ăn uống phù hợp, giấc ngủ và sự đều đặn đều góp phần vào thay đổi lâu dài.</p><p style="margin-top:15px">Tham khảo: <a href="https://www.cdc.gov/physical-activity-basics/measuring/index.html" target="_blank" rel="noopener">CDC · Đo cường độ vận động</a> · <a href="https://www.acefitness.org/fitfacts/pdfs/fitfacts/itemid_80.pdf" target="_blank" rel="noopener">ACE · Giảm mỡ cục bộ</a>.</p>`);}
function showGuide(){modal('Tập vừa sức, tập lâu dài','Hướng dẫn cho tuần làm quen',`<h3>Chọn 1 trong 2 phương án mỗi buổi</h3><p>Tạ đơn / dây cáp hoặc tập với máy là hai cách thay thế cho cùng buổi tập. Chọn phương án có dụng cụ phù hợp; bài dây cáp và bài trên thảm có thể xuất hiện ở cả hai.</p><h3>Bắt đầu với tải nhẹ</h3><p>T2–T4: làm 1 hiệp mỗi bài trước; chỉ thêm hiệp thứ 2 nếu còn khỏe và giữ được kỹ thuật. T5–T6: chỉ 1 hiệp nhẹ. Chọn mức tạ còn dư khoảng 3–4 lần, T5 dư 4–5 lần, không tập đến kiệt sức.</p><h3>Giữ cổ tay thoải mái</h3><p>Cổ tay thẳng hàng cẳng tay, không bẻ ngược hoặc cuộn vào. Ưu tiên tay cầm trung lập khi dễ chịu. Đai cổ tay không thay thế kỹ thuật và không phải cách để cố chịu đau.</p><h3>Phục hồi quyết định buổi kế tiếp</h3><p>Lịch 5 tối là khung tham khảo. Vai và tay có thể mỏi sau T5: khi đó T6 bỏ phần thân trên, đi bộ nhẹ hoặc nghỉ. Bạn có thể bỏ buổi nếu chưa hồi phục, không cần tập bù dồn.</p><h3>Khi cần dừng</h3><p>Đau nhói, tê, sưng hoặc chóng mặt: dừng tập. Đau cổ tay kéo dài cần được đánh giá. Đau ngực, choáng hoặc khó thở bất thường: dừng ngay và tìm trợ giúp y tế.</p><div class="modal-callout">Kế hoạch giả định bạn là người trưởng thành và chưa có chống chỉ định vận động. Chiều cao, cân nặng và mô tả thể lực chưa đủ để xác định bệnh lý hay mức tạ phù hợp. Nhờ huấn luyện viên kiểm tra kỹ thuật trực tiếp.</div><p style="margin-top:15px">Nguyên tắc kỹ thuật và nghỉ ngơi: <a href="https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/weight-training/art-20045842" target="_blank" rel="noopener">Mayo Clinic</a>.</p>`);}
function showProgress(){
  const count=totalDone();
  modal('Tiến độ của tuần','19–25 tháng 10, 2026 · Tuần 01',`<p><strong style="font-size:32px;color:#688454">${Math.round(count/25*100)}%</strong> · ${count}/25 mục tập đã hoàn thành</p><div class="modal-progress-list">${days.slice(0,5).map((d,i)=>`<div class="modal-progress-day"><span>${d.short} · ${d.title}</span><strong>${countDay(i)}/5 ${sessionComplete(i)?'✓':''}</strong></div>`).join('')}</div><h3>Tiến độ là sự đều đặn, không phải ép sức.</h3><p>Đánh dấu khi đã thực hiện bài phù hợp với sức hôm đó. Hai phương án dụng cụ dùng chung tiến độ cho cùng nhóm động tác. Khởi động chưa được tính vào 5 mục, gồm 4 bài kháng lực và 1 phần cardio.</p><p style="margin-top:12px">Dữ liệu chỉ lưu trên trình duyệt này. Nếu xóa dữ liệu trình duyệt hoặc đổi thiết bị, tiến độ sẽ không được đồng bộ.</p>`);
}
function showSources(){modal('Nguồn & ghi chú kế hoạch','Nội dung tham khảo · Xem ngày 17/10/2026',`<p>Lịch được xây từ thông tin bạn cung cấp: 178 cm, 73 kg, thể lực còn yếu, cổ tay yếu, mục tiêu tăng cơ và giảm mỡ. Tuần triển khai là 19–25/10/2026 theo phần “tuần sau” trong yêu cầu.</p><h3>Nguồn tham khảo</h3><ul><li><a href="https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/weight-training/art-20045842" target="_blank" rel="noopener">Mayo Clinic · Kỹ thuật tập kháng lực</a>: khởi động, tải phù hợp, kiểm soát động tác, nghỉ và dừng khi đau.</li><li><a href="https://www.cdc.gov/physical-activity-basics/measuring/index.html" target="_blank" rel="noopener">CDC · Cường độ vận động</a>: cách dùng khả năng nói chuyện để kiểm tra cường độ.</li><li><a href="https://www.acefitness.org/fitfacts/pdfs/fitfacts/itemid_80.pdf" target="_blank" rel="noopener">ACE · Sự thật về giảm mỡ cục bộ</a>.</li></ul><h3>Giới hạn cá nhân hoá</h3><p>Phân chia buổi, số hiệp và mức gắng sức là gợi ý khởi đầu, không phải chương trình được khám và kê riêng. Lịch T5–T6 được giảm khối lượng vì có nhóm cơ trùng nhau. Khi chưa hồi phục, ưu tiên nghỉ hơn hoàn thành đủ lịch.</p><h3>Hình ảnh</h3><p>Ảnh phòng gym: <a href="https://unsplash.com/photos/a-gym-filled-with-lots-of-machines-and-weights-1RNQ11ZODJM" target="_blank" rel="noopener">Unsplash</a>. Ảnh động tác: <a href="https://github.com/yuhonas/free-exercise-db" target="_blank" rel="noopener">Free Exercise DB</a> (23 bộ, mỗi bộ 2 tư thế). Minh hoạ máy nâng vai: <a href="https://gymfitclub.ir/articles/showarticle/205" target="_blank" rel="noopener">GymFit</a>. Một số ảnh thể hiện biến thể dụng cụ; ghi chú dưới từng bài nêu điểm cần điều chỉnh. Không thay thế hướng dẫn trực tiếp.</p>`);}

let timerEnd=null, timerInterval=null, timerPaused=null;
function startRest(){timerEnd=Date.now()+60000;timerPaused=null;renderTimer();ensureTimer();}
function ensureTimer(){if(timerInterval)clearInterval(timerInterval);timerInterval=setInterval(()=>{if(timerEnd&&Date.now()>=timerEnd){clearInterval(timerInterval);timerInterval=null;timerEnd=null;timerPaused=null;if($('#timer-host'))$('#timer-host').innerHTML='<div class="timer-panel"><div class="timer-time">00:00</div><p class="timer-caption">Đã hết giờ nghỉ. Chỉ tập tiếp khi đã sẵn sàng.</p></div>';toast('Hết 60 giây nghỉ. Tập tiếp khi bạn đã sẵn sàng.');}else if(timerEnd)renderTimer();},250);}
function renderTimer(){
  const host=$('#timer-host');if(!host)return;
  const remaining=timerPaused??Math.max(0,Math.ceil((timerEnd-Date.now())/1000));
  const display=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;
  if(!$('#timer-pause'))host.innerHTML=`<div class="timer-panel"><div class="timer-time" role="timer" aria-label="Thời gian nghỉ còn lại"></div><div class="timer-controls"><button id="timer-pause">Tạm dừng</button><button id="timer-add">+30 giây</button><button id="timer-reset">Đặt lại</button></div></div>`;
  $('.timer-time',host).textContent=display;
  $('#timer-pause').textContent=timerPaused===null?'Tạm dừng':'Tiếp tục';
  $('#timer-pause').onclick=()=>{if(timerPaused===null){timerPaused=Math.max(0,Math.ceil((timerEnd-Date.now())/1000));timerEnd=null;clearInterval(timerInterval);timerInterval=null;}else{timerEnd=Date.now()+timerPaused*1000;timerPaused=null;ensureTimer();}renderTimer();};
  $('#timer-add').onclick=()=>{if(timerPaused!==null)timerPaused+=30;else timerEnd+=30000;renderTimer();};
  $('#timer-reset').onclick=startRest;
}
function printPlan(){
  let target=$('#print-content');if(!target){target=document.createElement('div');target.id='print-content';target.className='print-content';$('.page-content').append(target);}
  target.innerHTML=`<h1>Nhịp Tập · Lịch tập của bạn</h1><p>19–25/10/2026 · 178 cm · 73 kg · ${exerciseModeLabel()}</p><p>Khởi động 5–10 phút. T2–T4: 1 hiệp, thêm hiệp 2 nếu còn khỏe; T5–T6: 1 hiệp nhẹ. Nghỉ 60–90 giây. Không tập đến kiệt sức, dừng nếu đau. Nếu chưa hồi phục, bỏ bài hoặc nghỉ.</p>${days.map(d=>d.rest?`<div class="print-day"><h2>${d.short} · ${d.date}/10 · Nghỉ phục hồi</h2></div>`:`<div class="print-day"><h2>${d.short} · ${d.date}/10 · ${d.title}</h2>${d.note?`<p>${d.note}</p>`:''}<ul>${d[state.mode].map(id=>`<li>□ ${exercises[id].name} · ${sets(d)} × ${exercises[id].reps} · ${exercises[id].cue}</li>`).join('')}<li>□ ${d.cardioName}: ${d.cardio} phút · ${d.cardioTip}</li></ul></div>`).join('')}<p>Hai lựa chọn dụng cụ thay thế cho nhau. Minh hoạ và kỹ thuật chi tiết nằm trên trang web. Cardio hỗ trợ thể lực; không có bài tập giảm mỡ riêng vùng bụng. Nguồn: Mayo Clinic (Weight training: Do’s and don’ts), CDC (Physical Activity Intensity), ACE (Spot Reduction).</p>`;
  window.print();
}

$('#guide-nav').onclick=showGuide;
$('#progress-nav').onclick=showProgress;
$('#sources-button').onclick=showSources;
$('#mobile-guide').onclick=showGuide;
$('#mobile-progress').onclick=showProgress;
$('#print-plan').onclick=printPlan;
$$('a[data-nav]').forEach(a=>a.addEventListener('click',()=>{$$('.nav-link').forEach(n=>n.classList.remove('active'));a.classList.add('active');}));
window.addEventListener('storage',event=>{if(event.key===STORAGE){try{const saved=JSON.parse(event.newValue);if(saved?.done&&typeof saved.done==='object'){state.done=saved.done;state.notes=typeof saved.notes==='string'?saved.notes:'';render();}}catch{}}});
render();
