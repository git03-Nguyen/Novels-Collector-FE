import axios from "../configs/axios";

const fetchChapterContent = async (source, novelSlug, chapterSlug) => {
    // TODO: replace this with calling API from server
    // const chapterData = {
    //     number: 10,
    //     title: 'Lời khuyên của Nhân Thần',
    //     length: 3413,
    //     view: 100,
    //     updatedAt: '2024-05-03 21:10:00',
    //     content: `Hắn trông như thế nào ?
    //     Tôi cũng không còn nhớ rõ nữa.
    //     Tôi nhớ rằng hắn đang cười, chỉ là tôi không còn nhớ chút gì hắn trông thế nào. Tôi đơn giản là không thể nhớ nổi gương mặt của hắn …
    //     Nhưng chắc chắn rằng, hăn ta đã ở đó.
    //     Một người đàn ông với gương mặt tôi không nhớ nổi.
    //     Tôi đã rất ngạc nhiên.
    //     Bởi vì đến tận khi hắn đột ngột xuất hiện, tôi đã chẳng cảm nhận được hắn chút nào.
    //     Saleyakt đứng lên với cơ thể khổng lồ và đe dọa hắn ta.
    //     Hai người cấp dưới cũng bị sốc vì sự xuất hiện của hắn.
    //     “Ngươi là ai … ?”
    //     “Ta là ai à ? Ta là Nhân Thần, vị thần của Nhân Giới.”
    //     Hắn tự nhận mình như thế.
    //     Nhân Thần.
    //     Tất nhiên, tôi đã biết rằng có 6 vị thần trong các thế giới.
    //     Tôi đã nghe từ Long Thần về sự tồn tại của Nhân Thần.
    //     Khi Nhân Thần lần đầu xuất hiện trong Long Giới cũng là khoảng thời gian sử thi của tôi.
    //     Long Thần và Long Tộc đã đang chiến tranh với các loại rồng để thống trị thế giới.
    //     Nhân Thần xuất hiện ở Long Giới và đưa ra 1 đề nghị với Long Thần.
    //     Hay tổ chức hội nghị các vị thần và trao đổi thông tin.
    //     Nhân Giới đã phát triển hơn những thế giới khác.
    //     Là chủng tộc có đời sống ngắn nhất giữa các chủng tộc trong cả 6 thế giới, nền văn minh của họ phát triển nhanh chóng.
    //     Những cá thế độc nhất và những ý tưởng cách mạng được phát triển thường xuyên hơn với họ.
    //     Vì vậy, thông tin được trình bày từ Long Thần trong hội nghị đặc biệt hữu ích cho các thế giới khác.
    //     Tại hội nghị đầu tiên tổ chức ở Long Giới, Long Thần đã biết được sự tồn tại của “ngôn ngữ” và “ký tự”. 
    //     Đó là vì việc chia sẻ hiểu biết của loài người về ngôn ngữ mà Long Tốc có thể phát triển được một nền văn minh của họ.
    //     Điều đó chưa phải tất cả.
    //     Nhân Thần đã rộng lòng chia sẽ đa dạng sự thông thái từ Nhân Giới.
    //     Cách để xây dựng thành phố, cách quản lý dân số, cách chiến đấu theo nhóm, và chăn nuôi động vật.
    //     Không có điều nào trong số chúng có thể xảy ra nếu chỉ dựa vào Long Tộc.
    //     Vì thế, Long Thần có niềm tin mạnh mẽ vào Nhân Thần.
    //     Tôn trọng như là người dẫn đầu các vị thần.
    //     “Xin thứ lỗi vì sự thô lỗ.”
    //     Vì thế, tôi đã chỉnh lại cư xử của mình ngay lập tức.
    //     Tôi đứng dậy và chào một cách trang trọng nhất.
    //     Tôi không thể thể hiện sự bất kính với người ngang hàng Long Thần, và càng dĩ nhiên với người có được sự tôn trọng của ông ấy.
    //     “Không sao cả, cứ là mình thôi.”
    //     Nhân Thần tiếp cận tôi khi đang căng thẳng và vỗ vay tôi lịch thiệp, và ngồi xuống.
    //     “Ta có một vài việc cùng Long Thần và tình cờ đi ngang qua.”
    //     Ông ấy đang làm gì ở đây ?
    //     Ông ấy trả lời, như là đọc được tim tôi.
    //     “Ngươi trông có vẻ tuyệt vọng khi tìm kiếm kẻ đã giết Long Tướng.”
    //     “Làm thế nào mà ngài biết ?”
    //     “Như đã nói, ta có một việc với Long Thần, và ông ấy đề cập về nó. Ông ấy đã lo lắng về ngươi.”
    //     “…”
    //     Những lời ấy đâm sâu vào trái tim tôi.
    //     Sau khi tìm kiếm qua quá nhiều năm mà không thu được thành quả gì, tôi cảm thấy như một cái gai đâm vào tim.
    //     Sau khi tôi nghe về Long Thần không nổi giận với tôi, thay vào đó lại lo cho tôi, ngực tôi cảm thấy bùng cháy.
    //     Tôi nhận ra mình yếu đuối và thấp bé như thế nào.
    //     Tôi gần như khóc.
    //     “Ông ấy và ta cùng quay về. Nếu ngươi gặp vấn đề, ta sẽ không ngại giúp đỡ ngươi một chút.”
    //     “Ngài biết cách tìm kẻ tình nghi sao ?”
    //     Nhân Thần cười, biết rằng ông ấy đã tự bẫy mình.
    //     “Không, giống như Long Thần, ta cũng không thể biết mọi thứ. Ta không biết mọi thứ, nhưng ta chắc chắn biết kiến thức từ những vị thần của mỗi thế giới. Ví dụ như, tiềm năng thực sự của ngươi … ”
    //     “Tiềm năng của tôi … ?”
    //     “Đúng vậy, ngươi, một con lai giữa Ma Tộc và Long Tộc,, chứa một sức mạnh phi thường bên trong ngươi.”
    //     Nhân Thần bước đi thong thả trước mặt tôi.
    //     Một nụ cười trên gương mặt.
    //     Một nụ cười đầy sự yên tâm.
    //     Nhưng một nụ cười yên tâm không phải lúc nào cũng trấn an.
    //     Hãy nhớ điều đó.
    //     Những kẻ lừa đảo luôn tập luyện điệu cười của chúng.
    //     Nhưng tôi đã không biết vào lúc đó.
    //     Tôi đã cảm thấy được dịu đi rất nhiều.
    //     Tràn đầy sự tin tưởng vào hắn ta.
    //     “Ngươi chưa từng có khoảnh khắc mà người cảm nhận được kẻ địch phía sau, hay phát hiện nơi kẻ địch đã đến ?”
    //     Quả thực là có, tôi đã từng có những khoảnh khắc như vậy trước đây.
    //     Thỉnh thoảng khi chiến đấu với những con rồng cùng Saleyakt, tôi có thể cảm nhận các di chuyển đằng sau mình.
    //     Không chỉ như vậy.
    //     Thậm chí lúc còn ở Ma Giới, tôi đã có vài hình ảnh về mình có khả năng như vậy.
    //     Nếu không, sẽ thật khó có thể sống cô độc trong thế giới đầy rẫy ma vật.
    //     “Đó là khả năng từ con mắt quỷ của ngươi. Sử dụng sức mạnh từ con mắt và nhìn lại xem. Hãy nhìn lại vào hiện trường, chắc chắn ngươi sẽ tìm được thứ ngươi mong muốn … fufufu …”
    //     Nhân Thần vẫn đang cười trong khi dần dần biến mất.
    //     Có lẽ hắn đã đi ra khỏi động, nhưng tôi có cảm giác hắn biến mất.
    //     Tôi không thể cử động và chỉ có thể chứng kiến sự biến mất của hắn.
    //     “…”
    //     Vào lúc tôi nhận ra, hắn đã đi rồi.
    //     Saleyakt và cấp dưới của tôi đã chìm vào giấc ngủ, cơ thể họ cuộn tròn lại.
    //     Như thể không có gì từng xảy ra.
    //     Tôi có cảm giác như tôi vừa thức dậy từ một giấc mơ.
    //     Dù vậy, tôi biết rằng những vị thần thỉnh thoảng sẽ dùng đến những năng lực bí ẩn.
    //     Có lẽ đây là một trong số các ví dụ.
    //     Đól à lý do tôi không phủ nhận giấc mơ, nhưng tôi muốn thử dùng mắt quỷ của mình.
    //     Tôi chắc chắn có sự ngờ vực của mình.
    //     Nếu hoàn cảnh khác đi, có lẽ tôi sẽ còn nghi vấn nhiều hơn.
    //     Thay vì tốn thời gian vào một năng lực chưa biết có tồn tại hay không.
    //     Nhưng tôi đã thiếu kiên nhẫn.
    //     Tôi nghĩ rằng tôi cần phải làm gì đó.
    //     Thậm chí khi không còn phương án khả thi nào.
    //     Tôi ngay lập tức trở về hang Kim Long.
    //     Không gì ngoài Crystal còn sót lại, nó đã trở lại thành một hang Kim Long bình thường.
    //     Một cái hang tối màu đỏ với những cây dương xỉ được treo ngược trên trần.
    //     Kim Long hầu hết là những vật ăn thịt, nhưng chúng cũng ăn dương xỉ để tồn tại khi đói.
    //     Ở đây, tôi tập trung ý thức nhìn vào phần phía sau của đôi mắt mình.
    //     “Đây là cái gì …”
    //     Sau đó, nó chính xác như những gì Nhân Thần đã nói.
    //     Tôi nhìn thấy rõ rằng thư sgif đó ở đằng sau mắt tôi.
    //     Nó thực sự tồn tại, và tôi đã không ý thức được việc sử dụng năng lực này.
    //     Thật khó để có thể giải thích.
    //     Chà, nói thể nào đây.
    //     Nó giống như một cơ chế nội bộ.
    //     Ta thường không chú ý đến nhịp tim của mình, trừ khi ta chú ý, phải vậy không ?
    //     Mắt quỷ của tôi cũng giống thế, trừ khi tôi có thể vận dụng với nó bằng ý niệm của mình.
    //     Tôi thậm chí còn không biết đến nó tồn tại đến tận lúc đấy.
    //     Có lẽ những gì Nhân Thần nói là một chất xúc tác cho điều gì đó, và nó mở khóa một sức mạnh tôi đã chỉ sử dụng trong vô thức.
    //     Mắt của tôi là một mắt quỷ.
    //     Nó khác với những con mắt quỷ thường thấy ngày nay … Nhưng nếu phải đặt tên, nó là mắt quỷ.
    //     Trong mắt của tôi, có những dấu vết rõ ràng còn lại.
    //     Tại xác của Crystal, và tại xác của con Kim Long.
    //     Cùng với dấu vết nghiên cứu từ Maxwell và cấp dưới của tôi.
    //     Và, một dấu vết của ai đó, ai đó rất khác, đang trôi nổi trên không trung.
    //     Tôi có  thể nhìn thấy nó rõ ràng.
    //     Không nghi ngờ gì nữa.
    //     Tôi theo sự chỉ dẫn với lòng tin tuyệt đối.
    //     Tôi nhảy lên Saleyakt và bay qua toàn Long Giới như một cơn gió.
    //     Băng qua 6 ngọn núi và 7 thung lũng.
    //     Theo dấu sự chỉ dẫn mà không có mảy may nghi ngờ nào.
    //     Tôi tự tin rằng nó phải là  thủ phạm.
    //     Có thể cho rằng tôi đã nhảy đến kết luận quá vội, nhưng chẳng còn cách nào khác.
    //     Nó là chỉ dẫn duy nhất mà tôi có.
    //     Mọi người đều muốn tin những gì họ có là đặc biệt.
    //     Tôi bay đi như mũi tên.
    //     Sau đó tôi đến một ngọn núi.
    //     Một ngọn núi vô danh không có bất kỳ sinh vật đặc trưng nào.
    //     Không đặc biệt cao, cũng không có loài vật loại rồng đặc biệt nào, không hang động cụ thể nào.
    //     Một ngọn núi thông thường trong Long Giới.
    //     Có một hang động trong sườn núi.
    //     Đúng vậy, một cái hang duy nhất.
    //     Nó không nên tồn tại ở đó.
    //     Liệu nó đã luôn tồn tại, hay nó bị đào lên bởi ai đó ?
    //     Có lẽ là khả năng thứ hai.
    //     Sau cùng thì, lối vào hang động có những dấu vết để lại bởi thứ gì đó sắc nhọn. Nó giống như là do có người làm.
    //     “…”
    //     Tôi do dự một lúc.
    //     Một tội phạm có khả năng giết một Long Tướng có lẽ đang ở đây.
    //     Liệu tôi có thể xoay sở với hắn không ?
    //     Có lẽ đó là điều không thể.
    //     Chẳng phải nó sẽ tốt hơn nếu trở về và yêu cầu viện quân từ các Long Tướng ?
    //     Nhưng tôi đã ngay lập tức lắc đầu.
    //     Cho đến lúc đó tôi đã cố định trong trạng thái sai lầm.
    //     Trạng thái “không thu được kết quả gì.”
    //     Cách duy nhất để khắc phục nó là lấy đầu tên thủ ác và đem nó về. 
    //     Tôi đã nghĩ như thế.
    //     “Gora, Scrubava… Đi thôi.”
    //     “Vâng !”
    //     “Xem chừng phía sau tôi.”
    //     Tôi để Saleyakt đợi ở phía ngoài hang và nhảy vào trong cùng với 2 cấp dưới.
    //     Giờ nhìn lại thì, nó có lẽ sẽ tốt hơn để gửi 1 người về Kayos và yêu cầu hỗ trợ từ Ngũ Long Tướng.
    //     Nhưng những người cấp dưới có lẽ đã có cùng suy nghĩ với tôi.
    //     Không ai chần chừ cả.
    //     Phía trong hang động thì chật và ẩm ướt.
    //     Những tảng đá xanh cứng bao phủ bởi rong rêu, gợi cảm giác rằng chẳng có thứ gì sống ở đây rất lau rồi.
    //     Nhưng với tôi rõ ràng là có ai đó.
    //     Luôn có những dấu vết ở mọi nơi.
    //     Không, không phải những dấu vết nhỏ.
    //     Một cái giường làm từ những nhánh gỗ, trang trí bằng hộp sọ của những con thằn lằn nhỏ.
    //     “Trông như không có ai ở nhfa, nhưng vẫn cần giữ cảnh giác.”
    //     “Vâng !”
    //     Tôi chắc chắn tên tội nhân ở đây.
    //     Cảm giác từ chiếc giường là giống hệt như trong hang Kim Long.
    //     Thậm chí dù tôi có thể cảm nhận hắn, tôi cũng không thể thấy được.
    //     Hắn đã ra ngoài sao ?
    //     Hay là …
    //     “… !”
    //     “Gwaaa !”
    //     Lúc đó, tôi nghe một âm thanh từ phía sau tôi.
    //     Nhìn nhanh qua, cổ của Scrubava đã bị cắt mất, cậu ấy gục xuống mà thậm chí còn không chảy máu.
    //     Nó quá bất ngờ.
    //     Tôi không thể phủ nhận sự bất cẩn, đã quá háo hức từ sức mạnh mới nhận được từ mắt quỷ.
    //     “Kẻ khốn nào … !”
    //     Nó bay trong bóng tối và tấn công về phía Gora.
    //     Tôi không để cơ hội vụt qua.
    //     Trong một hành động duy nhất, tôi chắn thân mình trước hướng di chuyển của hắn, chụp được cánh tay của hắn và ném văng hắn vào một tảng đá lớn.
    //     Sau đó, ánh sáng từ lối vào đã cho biết nhân dạng của hắn.
    //     Tôi đã kinh ngạc.
    //     Da đen, có 4 tay.
    //     Mắt đỏ.
    //     Chắc chắn không phải Long tộc.
    //     Là một con quỷ.
    //     Tôi đã biết ngay.
    //     Sau cùng thì, thứ gì đó tôi nhìn thấy vô số lần trước đó, thứ gì đó tôi từng mong mỏi.
    //     Nhưng thứ làm tôi kinh ngạc không phải việc hắn là Ma tộc.
    //     Đó là việc hắn không xuất hiện trong mắt quỷ của tôi.
    //     Bằng một kỹ thuật nào đó hay chỉ là tự nhiên ?
    //     May mắn là, dù cho tôi không thể lần ra hắn, tôi vẫn có thể theo dấu hắn qua dấu chân và mùi của hắn.
    //     Tôi chỉ không thể nhìn thấy hắn bằng mắt quỷ.
    //     “[!----!]”
    //     Hắn hét về phía tôi.
    //     Đây là Ma ngữ.
    //     Nhưng tôi đã không hiểu nó.
    //     Tôi đã không học Ma ngữ trước đó.
    //     Nhưng tôi có thể cảm nhận sự thù địch của hắn.
    //     “Chúng ta phải báo thù cho Crystal-sama và Scrubava ! Gora, canh chừng phía sau tôi !”
    //     “Vâng !”
    //     Tôi đánh giá rằng hắn là kẻ đã giết Crystal.
    //     Mở rộng móng vuốt của mình, tôi đẩy Long Đấu khí đi khắp cơ thể.
    //     Tay phải phía trước, tay trái trên ngực.
    //     Tư thế giống như Dora-sama.
    //     “[!-----!]”
    //     Tên ma vật hét lên thứ gì đó, nhận ra ý định trừ khử hắn của tôi.
    //     Ngay lập tức hắn bình tĩnh lại, đối mặt với tôi.
    //     Tôi điều chỉnh khoảng cách, và Gora bảo vệ điểm mù của tôi.
    //     Cổng ra phía sau chúng tôi.
    //     Hắn không còn đường lùi.
    //     “[!-----!]”
    //     Tên ma vật gào lên và đá xuống mặt đất.
    //     Trận chiến bắt đầu.
    //     Đó là một trận chết ác liệt.
    //     Hắn khá mạnh.
    //     Cho dù là cắt hắn với kỹ thuật móng vuốt hay cắn xuyên hắn bằng răng nanh, hắn đều tự tái tạo lại lập tức, di chuyển, và phản công.
    //     Dĩ nhiên, tôi đã bị quá sức.
    //     Tôi đã bị đánh gục nhiều lần và hộc máu hết lần này đến lần khác.
    //     Tôi không có cảm giác mình có thể thắng.
    //     Vào lúc đó tôi nghĩ về việc rút lui và yêu cầu hỗ trợ từ Ngũ Long Tướng.
    //     Đó rõ ràng là quyết định khôn ngoan.
    //     Thậm chí nếu Dora-sama dạy tôi không bao giờ chạy khỏi kẻ thù … Nó chỉ là hòa hoãn tạm thời để hoàn thành sứ mệnh.
    //     Nhưng suy nghĩ lại trong một trận chiến là điều ngu ngốc.
    //     Gora đã bị giết.
    //     Cậu ấy đã bị xé nát tim và chết.
    //     Một thoáng chốc chần chừ.
    //     Chỉ ngay trước khi tôi nghĩ về yêu cầu tạm hòa.
    //     Tôi không  thể quên đôi mắt của Gora dù chết vẫn còn mở khi hắn đâm xuyên qua ngực cậu.
    //     Tôi đã mất cả người cận vệ và con đường lùi của mình.
    //     Tôi tiếp tục chiến đấu.
    //     Đầy mong muốn rút lui.
    //     Mối quan hệ giữa tôi với Gora và Scrubava có ngắn ngủi, nhưng chúng tôi đã đi cùng nhau, ăn cùng nhau.
    //     Tôi phải báo thù cho cái chết của họ.
    //     Hơn cả thế nữa.
    //     Nếu tôi bỏ đi lúc này, nó đồng nghĩa với việc chối bỏ công sức của chúng tôi tất cả những năm qua.
    //     Tuy vậy, tôi dần dần đẩy bản thân đến tình trạng tuyệt vọng.
    //     Nó không quá hiển nhiên sao ?
    //     Làm thế nào tôi đánh bại một thứ bất tử được ?
    //     Bất kể tôi tấn công thế nào, nó đều tự khôi phục được.
    //     Nhưng tôi thì lại không thể.
    //     Dần dần, tôi bị dồn vào đường cùng.
    //     Thiếu sức mạnh để vượt qua hắn.
    //     Ưu điểm duy nhất là năng lượng thể chất gần như không giới hạn của tôi, vì thế tôi sẽ không thua ngay được.
    //     Cuộc chiến tiếp tục trong 10 ngày 10 đêm.
    //     Hang động bị sập xuống vì sự tàn phá của trận chiến, sườn núi bị sụp đổ, nhưng trận chiến vẫn chưa ngã ngũ.
    //     Chúng tôi đều tiếp tục một cách cứng đầu.
    //     Không, một cách kinh ngạc, hắn đã đạt đến giới hạn.
    //     Có lẽ hắn không phải loại có thể tiếp tục trong thời  gian dài mà không ăn uống.
    //     Khi tôi chú ý, hắn trông ốm đi một cách gây sốc.
    //     Hắn có cánh trên lưng và có thể bay, nhưng không nơi nào gần đây có khả năng đó như Long tộc.
    //     Vì thế hắn không thể đi xa để tìm con mồi.
    //     Bất kể có mạnh mẽ thế nào, sau 10 ngày chiến đầu thì sức mạnh của một người phải bị yếu đi.
    //     Vào ngày thứ 10, tôi chú ý rằng năng lực hồi phục của hắn đã yếu đi.
    //     Hắn cũng ý thức được điều đó.
    //     Tôi có thể thấy “Tôi không muốn chết” phản ánh trong đôi mắt hắn.
    //     Tuy nhiên, tôi thậm chí còn tơi tả hơn và đầy vết xước. Sẽ không có gì ngạc nhiên nếu tôi gục ngã bất kỳ khoảnh khắc nào.
    //     Gần như chẳng còn chút sức mạnh nào còn lại.
    //     Tôi nghĩ rằng nếu tôi tiếp tục chiến đấu thế này, tôi sẽ chắc chắn bị đánh bại.
    //     Thậm chí nếu chiến thắng trong tầm với, tôi cũng sẽ gục đổ trước.
    //     Nếu tôi thua, hắn sẽ ăn chúng tôi – tôi, Gora và Scrubava – để hồi phục sức mạnh.
    //     Thay vì báo thù cho Crystal-sama, chúng tôi trở thành thức ăn cho kẻ thù và nguồn sức mạnh cho hắn.
    //     Đó không phải sứ mệnh của tôi.
    //     Tôi phải rửa mối hận của Dora-sama.
    //     Tôi không thể phí bỏ sự hỗ trợ của Ngũ Long Tướng dành cho tôi.
    //     Tôi cần phải đáp ứng mong đợi của Long Thần.
    //     “Ohhhhhhhhhhhhh !”
    //     Vì thế tôi vắt kiệt toàn bộ sức mạnh còn lại của mình.
    //     Thứ gì đó phình to từ bụng của tôi.
    //     Nằm ngay bên dưới tim tôi.
    //     Một lực gì đó vượt lên, giống như mắc-ma sôi lên.
    //     Nó có lẽ có liên quan tới việc mở mắt quỷ của tôi.
    //     Tôi đã khai mở nó …
    //     Thực ra, tôi không thực sự nhớ tôi đã giải phóng nó thế nào.
    //     Thậm chí nếu yêu cầu tôi làm lại, tôi có thể sẽ không làm được.
    //     Tuy nhiên, cuốn theo hi vọng chiến thắng và ghét bị đánh bại, tôi để nó bộc phát ra ngoài.
    //     Và ngọn núi biến mất.
    //     Khi tôi thức dậy, cả hai đã bất tỉnh, nằm cùng nhau ở một vách núi gần đó.
    //     Long Đấu khi của tôi đã tiêu tán hết.
    //     Như một quả bom tự sát.
    //     Nguồn năng lượng nó phóng thích đã thổi bay ngọn núi và làm hắn bất tỉnh.
    //     Đó là một thất bại cho cả 2 bên.
    //     Nó có vẻ như Saleyakt đã gắp cả 2 chúng tôi trong khi chúng tôi đã mất ý thức và mang chúng tôi đến vách núi này.
    //     Saleyakt đã cứu mạng tôi.
    //     Ngay khi tôi thức dậy, tôi trói cánh tay và chân hắn với roi làm từ da và xương rồng.
    //     Thật lòng mà nói, tôi đã may mắn khi tỉnh trước hắn.
    //     Dù sao thì, tôi cũng bắt được kẻ đã giết Crystal.
    //     Tôi đã hoàn thành nhiệm vụ.

    //     `,

    // }

    // chapterData.content = chapterData.content.split('\n');

    // chapterData.content = chapterData.content.map(line => {
    //     let newLine = `<p>${line.trim()}</p>`;
    //     return newLine;
    // })

    try {
        const response = await axios.get(`/api/v1/novel/${source}/${novelSlug}/${chapterSlug}`);
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }
        return {
            statusCode: 404,
            data: null,
            message: "Chapter content not found !"
        }
    } catch (error) {
        console.log("Error fetching chapter content: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }

}

const ChapterService = {
    fetchChapterContent,
}


export default ChapterService;